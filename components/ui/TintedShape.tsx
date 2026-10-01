/**
 * A decorative 3D shape rendered in a flat tint.
 *
 * The Figma file builds these from an image fill clipped by a mask group:
 * one grey render of the shape, masked to a solid lime or white fill. The
 * same result is produced by making the exported shape the CSS mask and
 * colouring the mask target, which keeps a single asset per shape
 * instead of a separate lime and white render of each.
 *
 * Used by the hero ornaments, the creator CTA and the feature band.
 */
export function TintedShape({
  src,
  tint,
  className = "",
  style,
}: {
  /** Path to an exported shape image, used as the mask. */
  src: string;
  tint: "lime" | "white";
  className?: string;
  style?: React.CSSProperties;
}) {
  const mask = `url(${src}) center / contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={`block ${className}`}
      style={{
        ...style,
        backgroundColor: tint === "lime" ? "#d4fb20" : "#ffffff",
        WebkitMask: mask,
        mask,
      }}
    />
  );
}
