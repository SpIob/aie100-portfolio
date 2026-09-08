import { useEffect, useRef, useState, useCallback } from "react";

const KONAMI_HINT = "↑ ↑ ↓ ↓ ← → ← → B A";

interface DinoGameProps {
  onClose: () => void;
  highScore: number;
  onHighScore: (score: number) => void;
}

const STORAGE_KEY = "dino-high-score";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 180;

const GROUND_HEIGHT = 20;
const GRAVITY = 0.6;
const JUMP_VELOCITY = -11;
const INITIAL_SPEED = 6;
const MAX_SPEED = 14;
const SPEED_INCREMENT = 0.0015;

const DINO_WIDTH = 44;
const DINO_HEIGHT = 44;
const DINO_X = 50;

const CACTUS_MIN_GAP = 320;
const CACTUS_MAX_GAP = 520;
const BIRD_MIN_GAP = 400;
const BIRD_MAX_GAP = 600;

type GameState = "ready" | "playing" | "gameover";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "cactus" | "bird";
  frame: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
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
  particles: Particle[];
  nextObstacleDist: number;
  clouds: Cloud[];
  distanceSinceLastObstacle: number;
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
    particles: [],
    nextObstacleDist: CACTUS_MIN_GAP + Math.random() * (CACTUS_MAX_GAP - CACTUS_MIN_GAP),
    clouds: Array.from({ length: 4 }, (_, i) => ({
      x: (i * CANVAS_WIDTH) / 4 + Math.random() * 100,
      y: 20 + Math.random() * 50,
      speed: 0.3 + Math.random() * 0.4,
    })),
    distanceSinceLastObstacle: 0,
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
    gameRef.current = {
      state: "ready",
      score: 0,
      highScore: gameRef.current.highScore,
      speed: INITIAL_SPEED,
      dinoY: CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT,
      dinoVy: 0,
      dinoFrame: 0,
      obstacles: [],
      particles: [],
      nextObstacleDist: CACTUS_MIN_GAP + Math.random() * (CACTUS_MAX_GAP - CACTUS_MIN_GAP),
      clouds: Array.from({ length: 4 }, (_, i) => ({
        x: (i * CANVAS_WIDTH) / 4 + Math.random() * 100,
        y: 20 + Math.random() * 50,
        speed: 0.3 + Math.random() * 0.4,
      })),
      distanceSinceLastObstacle: 0,
    };
    setState("ready");
    setScore(0);
  }, []);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.state === "gameover") return;
    if (g.state === "ready") {
      g.state = "playing";
      setState("playing");
    }
    if (g.dinoY >= CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT - 1) {
      g.dinoVy = JUMP_VELOCITY;
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClose();
      return;
    }
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      jump();
    }
  }, [jump, onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const touchHandlerRef = useRef<((e: TouchEvent) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    touchHandlerRef.current = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };
    canvas.addEventListener("touchstart", touchHandlerRef.current, { passive: false });

    return () => {
      if (touchHandlerRef.current) {
        canvas.removeEventListener("touchstart", touchHandlerRef.current);
      }
    };
  }, [jump]);

  const spawnObstacle = useCallback((): Obstacle => {
    const g = gameRef.current;
    const isBird = Math.random() < 0.25 && g.speed > 8;
    if (isBird) {
      const heights = [
        CANVAS_HEIGHT - GROUND_HEIGHT - 60,
        CANVAS_HEIGHT - GROUND_HEIGHT - 90,
        CANVAS_HEIGHT - GROUND_HEIGHT - 110,
      ];
      return {
        x: CANVAS_WIDTH,
        y: heights[Math.floor(Math.random() * heights.length)],
        width: 46,
        height: 36,
        type: "bird",
        frame: 0,
      };
    }
    const cactusTypes = [
      { width: 20, height: 44 },
      { width: 34, height: 44 },
      { width: 14, height: 32 },
    ];
    const t = cactusTypes[Math.floor(Math.random() * cactusTypes.length)];
    return {
      x: CANVAS_WIDTH,
      y: CANVAS_HEIGHT - GROUND_HEIGHT - t.height,
      width: t.width,
      height: t.height,
      type: "cactus",
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

  const createExplosionParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const velocity = 2 + Math.random() * 3;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        life: 30 + Math.random() * 20,
        color: Math.random() < 0.5 ? "#B4842A" : "#A6432F",
      });
    }
    gameRef.current.particles.push(...newParticles);
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
      setScore(g.score);

      g.distanceSinceLastObstacle += newSpeed;

      const updatedObstacles: Obstacle[] = [];
      let collision = false;

      for (const obs of g.obstacles) {
        const newX = obs.x - newSpeed;
        if (newX + obs.width > -20) {
          updatedObstacles.push({
            ...obs,
            x: newX,
            frame: obs.type === "bird" ? (obs.frame + 0.15) % 2 : obs.frame,
          });

          if (!collision && checkCollision(DINO_X, g.dinoY, { ...obs, x: newX })) {
            collision = true;
          }
        }
      }

      if (updatedObstacles.length === 0 || g.distanceSinceLastObstacle >= g.nextObstacleDist) {
        const newObs = spawnObstacle();
        updatedObstacles.push(newObs);
        g.nextObstacleDist = newObs.type === "bird"
          ? BIRD_MIN_GAP + Math.random() * (BIRD_MAX_GAP - BIRD_MIN_GAP)
          : CACTUS_MIN_GAP + Math.random() * (CACTUS_MAX_GAP - CACTUS_MIN_GAP);
        g.distanceSinceLastObstacle = 0;
      }

      g.obstacles = updatedObstacles;

      if (collision) {
        createExplosionParticles(DINO_X + DINO_WIDTH / 2, g.dinoY + DINO_HEIGHT / 2);
        g.state = "gameover";
        setState("gameover");
        updateHighScore(g.score);
      }

      if (!prefersReducedMotionRef.current) {
        for (const cloud of g.clouds) {
          cloud.x -= cloud.speed * (newSpeed / INITIAL_SPEED);
          if (cloud.x < -100) {
            cloud.x = CANVAS_WIDTH + Math.random() * 100;
          }
        }
      }

      const aliveParticles: Particle[] = [];
      for (const p of g.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 1;
        if (p.life > 0) {
          aliveParticles.push(p);
        }
      }
      g.particles = aliveParticles;
    } else if (g.state === "gameover") {
      const aliveParticles: Particle[] = [];
      for (const p of g.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 1;
        if (p.life > 0) {
          aliveParticles.push(p);
        }
      }
      g.particles = aliveParticles;
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [spawnObstacle, checkCollision, createExplosionParticles, updateHighScore]);

  useEffect(() => {
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameLoop]);

  const drawDino = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) => {
    ctx.save();
    ctx.translate(x, y);

    const legOffset = Math.sin(frame * 0.6) * 3;
    const eyeBlink = frame % 40 < 2;

    ctx.fillStyle = "#2F6F62";

    ctx.beginPath();
    ctx.roundRect(0, 0, DINO_WIDTH, DINO_HEIGHT, 4);
    ctx.fill();

    ctx.fillStyle = "#1B2A2A";
    ctx.beginPath();
    ctx.moveTo(8, 8);
    ctx.lineTo(22, 8);
    ctx.lineTo(26, 18);
    ctx.lineTo(36, 18);
    ctx.lineTo(36, 34);
    ctx.lineTo(8, 34);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = eyeBlink ? "#E4DFCB" : "#1B2A2A";
    ctx.beginPath();
    ctx.arc(30, 14, eyeBlink ? 1 : 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#E4DFCB";
    ctx.fillRect(28, 22, 6, 4);
    ctx.fillRect(18, 28, 12, 4);

    ctx.fillStyle = "#2F6F62";
    ctx.fillRect(6, DINO_HEIGHT - 10 + legOffset, 10, 10);
    ctx.fillRect(DINO_WIDTH - 16, DINO_HEIGHT - 10 - legOffset, 10, 10);

    ctx.restore();
  }, []);

  const drawCactus = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#2F6F62";

    if (width > 30) {
      ctx.fillRect(7, 0, 20, height);
      ctx.fillRect(0, 12, 14, height - 12);
      ctx.fillRect(27, 18, 7, height - 18);
    } else if (width > 20) {
      ctx.fillRect(3, 0, 14, height);
      ctx.fillRect(0, 10, 10, height - 10);
      ctx.fillRect(17, 16, 7, height - 16);
    } else {
      ctx.fillRect(2, 0, 10, height);
    }
    ctx.restore();
  }, []);

  const drawBird = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, frame: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#4B5C5C";

    const wingUp = Math.floor(frame) === 0;

    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, width / 2 - 2, height / 2 - 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1B2A2A";
    ctx.beginPath();
    ctx.ellipse(width / 2 + 8, height / 2 - 4, 4, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#E4DFCB";
    ctx.beginPath();
    ctx.arc(width / 2 + 10, height / 2 - 3, 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#4B5C5C";
    if (wingUp) {
      ctx.beginPath();
      ctx.moveTo(width / 2 - 6, height / 2);
      ctx.lineTo(width / 2 - 18, height / 2 - 12);
      ctx.lineTo(width / 2 + 2, height / 2 + 2);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(width / 2 - 6, height / 2);
      ctx.lineTo(width / 2 - 18, height / 2 + 12);
      ctx.lineTo(width / 2 + 2, height / 2 - 2);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }, []);

  const drawGround = useCallback((ctx: CanvasRenderingContext2D) => {
    const gy = CANVAS_HEIGHT - GROUND_HEIGHT;
    ctx.fillStyle = "#2F6F62";
    ctx.fillRect(0, gy, CANVAS_WIDTH, GROUND_HEIGHT);

    ctx.fillStyle = "#1B2A2A";
    for (let i = 0; i < CANVAS_WIDTH; i += 16) {
      const offset = (Date.now() / 50 + i) % 32;
      if (offset < 8) ctx.fillRect(i, gy + 4, 6, 2);
    }
  }, []);

  const drawClouds = useCallback((ctx: CanvasRenderingContext2D, clouds: Cloud[]) => {
    ctx.fillStyle = "rgba(27, 42, 42, 0.15)";
    for (const cloud of clouds) {
      ctx.beginPath();
      ctx.ellipse(cloud.x, cloud.y, 30, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(cloud.x + 25, cloud.y - 4, 22, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(cloud.x + 45, cloud.y, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for (const p of particles) {
      const alpha = p.life / 50;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const drawScore = useCallback((ctx: CanvasRenderingContext2D, score: number, highScore: number) => {
    ctx.font = "18px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#1B2A2A";
    ctx.textAlign = "right";
    ctx.fillText(String(score).padStart(5, "0"), CANVAS_WIDTH - 20, 30);

    ctx.font = "12px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#66756F";
    ctx.fillText(`HI ${String(highScore).padStart(5, "0")}`, CANVAS_WIDTH - 20, 50);
  }, []);

  const drawReadyScreen = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgba(27, 42, 42, 0.6)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#E4DFCB";
    ctx.font = "bold 28px 'Fraunces', serif";
    ctx.textAlign = "center";
    ctx.fillText("DINO RUN", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

    ctx.font = "14px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#B4842A";
    ctx.fillText("Press SPACE or ↑ to jump", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);

    ctx.font = "11px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#66756F";
    ctx.fillText(`Hint: ${KONAMI_HINT}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
  }, []);

  const drawGameOver = useCallback((ctx: CanvasRenderingContext2D, score: number, highScore: number) => {
    ctx.fillStyle = "rgba(27, 42, 42, 0.75)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#A6432F";
    ctx.font = "bold 28px 'Fraunces', serif";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

    ctx.fillStyle = "#E4DFCB";
    ctx.font = "18px 'IBM Plex Mono', monospace";
    ctx.fillText(`Score: ${String(score).padStart(5, "0")}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

    if (score >= highScore && score > 0) {
      ctx.fillStyle = "#B4842A";
      ctx.font = "bold 14px 'IBM Plex Mono', monospace";
      ctx.fillText("NEW HIGH SCORE!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 35);
    }

    ctx.font = "12px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#66756F";
    ctx.fillText("Press SPACE to restart  •  ESC to close", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 65);
  }, []);

  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    const g = gameRef.current;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#E4DFCB";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawClouds(ctx, g.clouds);
    drawGround(ctx);

    for (const obs of g.obstacles) {
      if (obs.type === "bird") {
        drawBird(ctx, obs.x, obs.y, obs.width, obs.height, obs.frame);
      } else {
        drawCactus(ctx, obs.x, obs.y, obs.width, obs.height);
      }
    }

    drawDino(ctx, DINO_X, g.dinoY, g.dinoFrame);
    drawParticles(ctx, g.particles);
    drawScore(ctx, g.score, g.highScore);

    if (g.state === "ready") drawReadyScreen(ctx);
    if (g.state === "gameover") drawGameOver(ctx, g.score, g.highScore);
  }, [drawClouds, drawGround, drawBird, drawCactus, drawDino, drawParticles, drawScore, drawReadyScreen, drawGameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let renderFrame: number;

    const renderLoop = () => {
      render(ctx);
      renderFrame = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      if (renderFrame) cancelAnimationFrame(renderFrame);
    };
  }, [render]);

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
          <kbd>SPACE</kbd> / <kbd>↑</kbd> Jump &nbsp;•&nbsp; <kbd>ESC</kbd> Close
        </footer>
      </div>
    </div>
  );
}

export default DinoGame;