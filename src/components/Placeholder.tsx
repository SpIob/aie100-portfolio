// Two small building blocks used across every section: if a data field is
// blank, show a dashed placeholder with a "TBD" tag; once it's filled in,
// it renders as normal content automatically.

interface PlaceholderLineProps {
  value: string;
  fallback: string;
  className?: string;
}

export function PlaceholderLine({ value, fallback, className = "" }: PlaceholderLineProps) {
  const isEmpty = value.trim().length === 0;
  return (
    <span className={`${className} ${isEmpty ? "is-placeholder-inline" : ""}`.trim()}>
      {isEmpty ? fallback : value}
    </span>
  );
}

interface PlaceholderBlockProps {
  value: string;
  fallback: string;
}

export function PlaceholderBlock({ value, fallback }: PlaceholderBlockProps) {
  const isEmpty = value.trim().length === 0;
  if (!isEmpty) {
    return <p className="filled-block">{value}</p>;
  }
  return (
    <div className="placeholder-box">
      {fallback}
      <span className="placeholder-tag">TBD</span>
    </div>
  );
}
