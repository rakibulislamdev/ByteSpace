import { Icon } from "./icons";

/**
 * The star + numeric rating used on course cards and section headers.
 * In the design the star sits inline with the number at 18px.
 */
export function StarRating({
  value,
  size = 16,
  tone = "lime",
  className = "",
}: {
  value: number;
  size?: number;
  tone?: "lime" | "blue" | "dark" | "muted";
  className?: string;
}) {
  const tones = {
    lime: "text-lime",
    blue: "text-brand",
    dark: "text-ink",
    muted: "text-subtle",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Icon name="star-lime" size={size} className={tones[tone]} />
      <span className="t-h-s">{value.toFixed(1)}</span>
    </span>
  );
}

/** "4.5 (240)" - rating plus review count, used in the hero and footer cards. */
export function RatingCount({
  value,
  count,
  className = "",
}: {
  value: number;
  count: number;
  className?: string;
}) {
  return (
    <span className={`t-body-s text-subtle ${className}`}>
      {value.toFixed(1)} ({count})
    </span>
  );
}
