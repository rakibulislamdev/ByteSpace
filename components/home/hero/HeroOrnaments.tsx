import { TintedShape } from "@/components/ui/TintedShape";

/**
 * The hero's decorative 3D shapes.
 *
 * Two coordinate systems, because the design's frame is 1440 wide and a
 * phone is 375. Scaling the whole 1440px layer down to fit squeezes every
 * shape into the centre and shrinks them to specks, and leaving the
 * frame's coordinates as they are puts all five off-screen. So below md
 * each shape gets its own placement inside the viewport; from md up the
 * frame's own coordinates apply against a centred 1440px layer.
 */

type Placement = {
  src: string;
  tint: "lime" | "white";
  /** Below md, within the viewport. */
  m: string;
  /** md and up, against the 1440 frame. */
  d: string;
};

const SHAPES: Placement[] = [
  {
    src: "/assets/hero-float-6.png",
    tint: "lime",
    m: "left-[-58px] top-[104px] size-[124px]",
    d: "md:left-[-118px] md:top-[702px] md:size-[385px]",
  },
  {
    src: "/assets/hero-float-4.png",
    tint: "lime",
    m: "left-[252px] top-[112px] size-[98px]",
    d: "md:left-[151px] md:top-[320px] md:size-[146px]",
  },
  {
    src: "/assets/hero-float-3.png",
    tint: "white",
    m: "left-[-40px] top-[268px] size-[88px]",
    d: "md:left-[350px] md:top-[626px] md:size-[175px]",
  },
  {
    src: "/assets/hero-float-1.png",
    tint: "white",
    m: "left-[256px] top-[300px] size-[92px]",
    d: "md:left-[1154px] md:top-[169px] md:size-[222px]",
  },
  {
    src: "/assets/hero-float-4.png",
    tint: "lime",
    m: "left-[120px] top-[510px] size-[140px]",
    d: "md:left-[1080px] md:top-[0px] md:size-[332px]",
  },
];

export function HeroOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* The lime disc the figure stands in front of. */}
      <span className="absolute bottom-0 left-1/2 size-[320px] -translate-x-1/2 rounded-full bg-lime sm:size-[520px] md:bottom-[-300px] md:size-[900px]" />

      <div className="absolute inset-0 md:left-1/2 md:h-[1024px] md:w-[1440px] md:-translate-x-1/2">
        {SHAPES.map((s, i) => (
          <TintedShape
            key={i}
            src={s.src}
            tint={s.tint}
            className={`absolute ${s.m} ${s.d}`}
          />
        ))}
      </div>
    </div>
  );
}
