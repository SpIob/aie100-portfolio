import { useEffect, useRef, useState, useCallback } from "react";
import "./DinoGame.css";

const KONAMI_HINT = "\u2191 \u2191 \u2193 \u2193 \u2190 \u2192 \u2190 \u2192 B A";

interface DinoGameProps {
  onClose: () => void;
  highScore: number;
  onHighScore: (score: number) => void;
}

const STORAGE_KEY = "dino-high-score";

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 150;

const GROUND_HEIGHT = 18;
const GRAVITY = 0.5;
const JUMP_VELOCITY_SHORT = -9;
const JUMP_VELOCITY_LONG = -13;
const JUMP_HOLD_THRESHOLD = 120;
const INITIAL_SPEED = 5;
const MAX_SPEED = 11;
const SPEED_INCREMENT = 0.0008;

const DINO_WIDTH = 36;
const DINO_HEIGHT = 36;
const DINO_X = 40;

const CACTUS_MIN_GAP = 350;
const CACTUS_MAX_GAP = 550;

type GameState = "ready" | "playing" | "gameover";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
}

interface GameStateRef {
  state: GameState;
  score: number;
  highScore: number;
  speed: number;
  dinoY: number;
  dinoVy: number;
  dinoFrame: number;
  obstacles: Obstacle[];
  nextObstacleDist: number;
  distanceSinceLastObstacle: number;
  jumpKeyDownTime: number;
  jumpKeyHeld: boolean;
}

function DinoGame({ onClose, highScore: initialHighScore, onHighScore }: DinoGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const prefersReducedMotionRef = useRef(false);

  const [state, setState] = useState<GameState>("ready");
  const [, setScore] = useState(0);
  const [highScore, setHighScore] = useState(initialHighScore);

  const gameRef = useRef<GameStateRef>({
    state: "ready",
    score: 0,
    highScore: initialHighScore,
    speed: INITIAL_SPEED,
    dinoY: CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT,
    dinoVy: 0,
    dinoFrame: 0,
    obstacles: [],
    nextObstacleDist: CACTUS_MIN_GAP + Math.random() * (CACTUS_MAX_GAP - CACTUS_MIN_GAP),
    distanceSinceLastObstacle: 0,
    jumpKeyDownTime: 0,
    jumpKeyHeld: false,
  });

  useEffect(() => {
    const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (stored > highScore) {
      setHighScore(stored);
      onHighScore(stored);
    }
  }, [highScore, onHighScore]);

  const resetGame = useCallback(() => {
    const g = gameRef.current;
    g.state = "ready";
    g.score = 0;
    g.speed = INITIAL_SPEED;
    g.dinoY = CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT;
    g.dinoVy = 0;
    g.dinoFrame = 0;
    g.obstacles.length = 0;
    g.nextObstacleDist = CACTUS_MIN_GAP + Math.random() * (CACTUS_MAX_GAP - CACTUS_MIN_GAP);
    g.distanceSinceLastObstacle = 0;
    g.jumpKeyDownTime = 0;
    g.jumpKeyHeld = false;
    setState("ready");
    setScore(0);
  }, []);

  const performJump = useCallback((holdDuration: number) => {
    const g = gameRef.current;
    if (g.state === "gameover") return;
    if (g.state === "ready") {
      g.state = "playing";
      setState("playing");
    }
    const groundY = CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT;
    if (g.dinoY >= groundY - 1) {
      const jumpVelocity = holdDuration > JUMP_HOLD_THRESHOLD ? JUMP_VELOCITY_LONG : JUMP_VELOCITY_SHORT;
      g.dinoVy = jumpVelocity;
    }
  }, []);

  const handleKeyDownRef = useRef<((e: KeyboardEvent) => void) | null>(null);
  const handleKeyUpRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClose();
      return;
    }
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      const g = gameRef.current;
      if (g.state === "gameover") {
        resetGame();
        return;
      }
      if (!g.jumpKeyHeld) {
        g.jumpKeyHeld = true;
        g.jumpKeyDownTime = performance.now();
      }
    }
  }, [onClose, resetGame]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
      const g = gameRef.current;
      if (g.jumpKeyHeld) {
        const holdDuration = performance.now() - g.jumpKeyDownTime;
        g.jumpKeyHeld = false;
        performJump(holdDuration);
      }
    }
  }, [performJump]);

  useEffect(() => {
    handleKeyDownRef.current = handleKeyDown;
    handleKeyUpRef.current = handleKeyUp;
    const onKeyDown = (e: KeyboardEvent) => handleKeyDownRef.current?.(e);
    const onKeyUp = (e: KeyboardEvent) => handleKeyUpRef.current?.(e);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const touchHandlerRef = useRef<{ startTime: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const touchStart = (e: TouchEvent) => {
      e.preventDefault();
      const g = gameRef.current;
      if (g.state === "gameover") {
        resetGame();
        return;
      }
      touchHandlerRef.current = { startTime: performance.now() };
    };

    const touchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (touchHandlerRef.current) {
        const holdDuration = performance.now() - touchHandlerRef.current.startTime;
        touchHandlerRef.current = null;
        performJump(holdDuration);
      }
    };

    canvas.addEventListener("touchstart", touchStart, { passive: false });
    canvas.addEventListener("touchend", touchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", touchStart);
      canvas.removeEventListener("touchend", touchEnd);
    };
  }, [performJump, resetGame]);

  const spawnObstacle = useCallback((): Obstacle => {
    const t = Math.random() < 0.5 ? { width: 18, height: 36 } : { width: 28, height: 36 };
    return {
      x: CANVAS_WIDTH,
      y: CANVAS_HEIGHT - GROUND_HEIGHT - t.height,
      width: t.width,
      height: t.height,
      frame: 0,
    };
  }, []);

  const checkCollision = useCallback((dinoX: number, dinoY: number, obs: Obstacle): boolean => {
    const dinoLeft = dinoX + 6;
    const dinoRight = dinoX + DINO_WIDTH - 6;
    const dinoTop = dinoY + 4;
    const dinoBottom = dinoY + DINO_HEIGHT - 4;

    const obsLeft = obs.x + 4;
    const obsRight = obs.x + obs.width - 4;
    const obsTop = obs.y + 4;
    const obsBottom = obs.y + obs.height - 4;

    return dinoLeft < obsRight && dinoRight > obsLeft && dinoTop < obsBottom && dinoBottom > obsTop;
  }, []);

  const updateHighScore = useCallback((newScore: number) => {
    const newHigh = Math.max(newScore, gameRef.current.highScore);
    gameRef.current.highScore = newHigh;
    setHighScore(newHigh);
    onHighScore(newHigh);
    try {
      localStorage.setItem(STORAGE_KEY, String(newHigh));
    } catch {}
  }, [onHighScore]);

  const drawDino = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) => {
    ctx.save();
    ctx.translate(x, y);

    const legOffset = Math.sin(frame * 0.6) * 2.5;
    const eyeBlink = frame % 40 < 2;

    ctx.fillStyle = "#2F6F62";

    ctx.beginPath();
    ctx.roundRect(0, 0, DINO_WIDTH, DINO_HEIGHT, 3);
    ctx.fill();

    ctx.fillStyle = "#1B2A2A";
    ctx.beginPath();
    ctx.moveTo(6, 6);
    ctx.lineTo(18, 6);
    ctx.lineTo(21, 14);
    ctx.lineTo(30, 14);
    ctx.lineTo(30, 28);
    ctx.lineTo(6, 28);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = eyeBlink ? "#E4DFCB" : "#1B2A2A";
    ctx.beginPath();
    ctx.arc(25, 11, eyeBlink ? 1 : 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#E4DFCB";
    ctx.fillRect(23, 18, 5, 3);
    ctx.fillRect(15, 24, 10, 3);

    ctx.fillStyle = "#2F6F62";
    ctx.fillRect(4, DINO_HEIGHT - 8 + legOffset, 8, 8);
    ctx.fillRect(DINO_WIDTH - 12, DINO_HEIGHT - 8 - legOffset, 8, 8);

    ctx.restore();
  }, []);

  const drawCactus = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#2F6F62";

    if (width > 22) {
      ctx.fillRect(5, 0, 18, height);
      ctx.fillRect(0, 10, 10, height - 10);
      ctx.fillRect(20, 16, 8, height - 16);
    } else {
      ctx.fillRect(3, 0, 12, height);
      ctx.fillRect(0, 8, 8, height - 8);
    }
    ctx.restore();
  }, []);

  const groundTimeRef = useRef(0);
  const drawGround = useCallback((ctx: CanvasRenderingContext2D) => {
    const gy = CANVAS_HEIGHT - GROUND_HEIGHT;
    ctx.fillStyle = "#2F6F62";
    ctx.fillRect(0, gy, CANVAS_WIDTH, GROUND_HEIGHT);

    groundTimeRef.current += 0.02;
    ctx.fillStyle = "#1B2A2A";
    for (let i = 0; i < CANVAS_WIDTH; i += 14) {
      const offset = (groundTimeRef.current * 50 + i) % 28;
      if (offset < 7) ctx.fillRect(i, gy + 3, 5, 2);
    }
  }, []);

  const drawScore = useCallback((ctx: CanvasRenderingContext2D, score: number, highScore: number) => {
    ctx.font = "16px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#1B2A2A";
    ctx.textAlign = "right";
    ctx.fillText(String(score).padStart(5, "0"), CANVAS_WIDTH - 16, 26);

    ctx.font = "11px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#66756F";
    ctx.fillText(`HI ${String(highScore).padStart(5, "0")}`, CANVAS_WIDTH - 16, 42);
  }, []);

  const drawReadyScreen = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgba(27, 42, 42, 0.6)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#E4DFCB";
    ctx.font = "bold 24px 'Fraunces', serif";
    ctx.textAlign = "center";
    ctx.fillText("DINO RUN", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 18);

    ctx.font = "12px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#B4842A";
    ctx.fillText("Press SPACE or \u2191 to jump", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 16);
    ctx.fillText("Hold for higher jump", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 32);

    ctx.font = "10px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#66756F";
    ctx.fillText(`Hint: ${KONAMI_HINT}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 52);
  }, []);

  const drawGameOver = useCallback((ctx: CanvasRenderingContext2D, score: number, highScore: number) => {
    ctx.fillStyle = "rgba(27, 42, 42, 0.75)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#A6432F";
    ctx.font = "bold 24px 'Fraunces', serif";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 26);

    ctx.fillStyle = "#E4DFCB";
    ctx.font = "16px 'IBM Plex Mono', monospace";
    ctx.fillText(`Score: ${String(score).padStart(5, "0")}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 8);

    if (score >= highScore && score > 0) {
      ctx.fillStyle = "#B4842A";
      ctx.font = "bold 12px 'IBM Plex Mono', monospace";
      ctx.fillText("NEW HIGH SCORE!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 28);
    }

    ctx.font = "11px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#66756F";
    ctx.fillText("Press SPACE to restart  \u2022  ESC to close", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 52);
  }, []);

  const render = useCallback((ctx: CanvasRenderingContext2D, g: GameStateRef) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#E4DFCB";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawGround(ctx);

    for (const obs of g.obstacles) {
      drawCactus(ctx, obs.x, obs.y, obs.width, obs.height);
    }

    drawDino(ctx, DINO_X, g.dinoY, g.dinoFrame);
    drawScore(ctx, g.score, g.highScore);

    if (g.state === "ready") drawReadyScreen(ctx);
    if (g.state === "gameover") drawGameOver(ctx, g.score, g.highScore);
  }, [drawGround, drawCactus, drawDino, drawScore, drawReadyScreen, drawGameOver]);

  const gameLoop = useCallback((timestamp: number) => {
    const g = gameRef.current;
    const dt = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (g.state === "playing") {
      const newDinoVy = g.dinoVy + GRAVITY;
      const newDinoY = Math.min(g.dinoY + newDinoVy, CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT);
      const grounded = newDinoY >= CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT;

      g.dinoVy = grounded ? 0 : newDinoVy;
      g.dinoY = newDinoY;

      if (grounded) {
        g.dinoFrame = (g.dinoFrame + 1) % 10;
      } else {
        g.dinoFrame = 0;
      }

      const newSpeed = Math.min(g.speed + SPEED_INCREMENT * dt, MAX_SPEED);
      g.speed = newSpeed;

      g.score += Math.floor(newSpeed * dt * 0.01);

      g.distanceSinceLastObstacle += newSpeed;

      let collision = false;

      for (let i = 0; i < g.obstacles.length; i++) {
        const obs = g.obstacles[i];
        const newX = obs.x - newSpeed;
        if (newX + obs.width > -20) {
          obs.x = newX;

          if (!collision && checkCollision(DINO_X, g.dinoY, obs)) {
            collision = true;
          }
        } else {
          g.obstacles.splice(i, 1);
          i--;
        }
      }

      if (g.obstacles.length === 0 || g.distanceSinceLastObstacle >= g.nextObstacleDist) {
        const newObs = spawnObstacle();
        g.obstacles.push(newObs);
        g.nextObstacleDist = CACTUS_MIN_GAP + Math.random() * (CACTUS_MAX_GAP - CACTUS_MIN_GAP);
        g.distanceSinceLastObstacle = 0;
      }

      if (collision) {
        g.state = "gameover";
        setState("gameover");
        updateHighScore(g.score);
      }
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        render(ctx, g);
      }
    }

    if (g.state === "playing") {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  }, [spawnObstacle, checkCollision, updateHighScore, render]);

  useEffect(() => {
    const g = gameRef.current;
    if (g.state === "playing") {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameLoop, state]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      } else if (gameRef.current.state === "playing") {
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [gameLoop]);

  const handleCanvasKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if ((e.key === " " || e.key === "ArrowUp") && state === "gameover") {
      e.preventDefault();
      resetGame();
    }
  }, [onClose, state, resetGame]);

  return (
    <div className="dino-modal" role="dialog" aria-modal="true" aria-labelledby="dino-title">
      <div className="dino-backdrop" onClick={onClose} />
      <div className="dino-container" onClick={(e) => e.stopPropagation()}>
        <header className="dino-header">
          <h2 id="dino-title" className="dino-title">Dino Run</h2>
          <button className="dino-close" onClick={onClose} aria-label="Close game">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>
        <div className="dino-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            tabIndex={0}
            onKeyDown={handleCanvasKeyDown}
            aria-label="Dino Run game canvas"
            role="application"
          />
        </div>
        <footer className="dino-footer">
          <kbd>SPACE</kbd> / <kbd>\u2191</kbd> Jump (hold for higher) &nbsp;\u2022&nbsp; <kbd>ESC</kbd> Close
        </footer>
      </div>
    </div>
  );
}

export default DinoGame;