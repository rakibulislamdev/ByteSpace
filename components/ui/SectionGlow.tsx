/**
 * The soft radial glows behind the light sections.
 *
 * The Figma file builds these as 1137px and 672px ellipses carrying a
 * radial gradient that falls 1 -> 0.23 at 53% -> 0.06 at 75% -> 0 at
 * 100%, in brand blue (#003be2) and a slightly different lime (#cbfc01)
 * from the primary accent. Both live outside the 1440 frame on purpose,
 * which is why the containers clip.
 */

type GlowProps = {
  /** Brand blue or the secondary lime used for the glows. */
  tone: "brand" | "lime";
  size: number;
  /** Offsets are in px against the 1440-wide frame. */
  x: number;
  y: number;
  /**
   * Overall strength. The Figma stops run 1 -> 0.23 -> 0.06 -> 0 at full
   * opacity, but the ellipses mostly sit off-frame, so only their faint
   * outer band is ever visible. Reproducing them at full strength washes
   * the whole band out, hence this multiplier.
   */
  strength?: number;
};

function glowBackground(tone: GlowProps["tone"]) {
  const rgb = tone === "brand" ? "0,59,226" : "203,252,1";
  return (
    `radial-gradient(circle closest-side,` +
    ` rgba(${rgb},1) 0%,` +
    ` rgba(${rgb},0.23) 53%,` +
    ` rgba(${rgb},0.06) 75%,` +
    ` rgba(${rgb},0) 100%)`
  );
}

export function SectionGlow({ tone, size, x, y, strength = 0.32 }: GlowProps) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        backgroundImage: glowBackground(tone),
        opacity: strength,
      }}
    />
  );
}

/** Glow field for the "Your Path to Professional Growth" section (Frame 15). */
export function GrowthGlows() {
  return (
    <>
      <SectionGlow tone="brand" size={1137} x={722} y={788} />
      <SectionGlow tone="lime" size={1137} x={-152} y={-466} />
      <SectionGlow tone="brand" size={1137} x={-508} y={183} />
      <SectionGlow tone="brand" size={1137} x={811} y={-458} />
      <SectionGlow tone="lime" size={672} x={-287} y={946} />
    </>
  );
}

/** Glow field for the testimonials section. */
export function TestimonialGlows() {
  return (
    <>
      <SectionGlow tone="lime" size={1137} x={842} y={-241} strength={0.2} />
      <SectionGlow tone="lime" size={672} x={395} y={-138} strength={0.16} />
      <SectionGlow tone="brand" size={1137} x={-442} y={149} strength={0.22} />
    </>
  );
}
