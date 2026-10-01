"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { testimonials } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { TestimonialGlows } from "@/components/ui/SectionGlow";
import { TintedShape } from "@/components/ui/TintedShape";

/**
 * Full-bleed brand-blue creator call to action, 1440x488.
 *
 * Content is a 964px centred column: a 710px headline, the supporting
 * copy at its full 964px, then the lime button. The 3D ornaments are
 * positioned from the design's own coordinates, most of which sit
 * outside the frame and are clipped by the section.
 */
export function CreatorCta() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
      
      gsap.from(".cta-ornament", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        rotation: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-[488px] overflow-hidden bg-brand text-on-dark">
      <CtaGrid />
      <CtaOrnaments />

      <div className="cta-content relative mx-auto max-w-[964px] px-5 pt-[85px] text-center md:px-0">
        <h2 className="t-display-lg mx-auto max-w-[710px] text-on-dark">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="t-body-l mx-auto mt-6 max-w-[964px] text-on-dark-muted">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </p>
        <div className="mt-8">
          <Button href="/register" variant="lime" size="md">
            Join as Creator
          </Button>
        </div>
      </div>
    </section>
  );
}

/** The 120px grid printed over the blue field, as in the hero. */
function CtaGrid() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
      }}
    />
  );
}

/**
 * Ornament placements.
 *
 * The design positions seven shapes against a 1440x488 frame, four of
 * them at or past the frame edge. On a 375px screen the two right-hand
 * ones fall off the viewport entirely and the rest are large enough to
 * swallow the copy, so each shape carries a mobile placement as well as
 * the frame's own from md up.
 */
const ORNAMENTS = [
  { src: "/assets/shape-lime-2.png", tint: "lime",  m: "left-[268px] top-[24px] size-[88px]",  d: "md:left-[1080px] md:top-0 md:size-[188px]" },
  { src: "/assets/hero-float-4.png", tint: "lime",  m: "left-[244px] top-[330px] size-[120px]", d: "md:left-[1110px] md:top-[289px] md:size-[330px]" },
  { src: "/assets/hero-float-6.png", tint: "lime",  m: "left-[-56px] top-[250px] size-[140px]", d: "md:left-[-118px] md:top-[-162px] md:size-[385px]" },
  { src: "/assets/hero-float-3.png", tint: "white", m: "left-[36px] top-[36px] size-[76px]",    d: "md:left-[178px] md:top-[5px] md:size-[175px]" },
  { src: "/assets/hero-float-1.png", tint: "white", m: "left-[-38px] top-[128px] size-[86px]",   d: "md:left-[-48px] md:top-[225px] md:size-[188px]" },
  { src: "/assets/hero-float-6.png", tint: "lime",  m: "left-[176px] top-[186px] size-[116px]", d: "md:left-[20px] md:top-[299px] md:size-[342px]" },
  { src: "/assets/shape-lime-4.png", tint: "white", m: "left-[290px] top-[130px] size-[112px]", d: "md:left-[1226px] md:top-[6px] md:size-[370px]" },
] as const;

function CtaOrnaments() {
  // The band is a centred, full-width text block, so there is no edge
  // left to put a shape in without it landing on the copy. They are
  // frame decoration; below md they are dropped rather than crowded in.
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      {ORNAMENTS.map((o, i) => (
        <TintedShape key={i} src={o.src} tint={o.tint} className={`cta-ornament absolute ${o.m} ${o.d}`} />
      ))}
    </div>
  );
}

/**
 * "Discover What Our Community Is Saying".
 *
 * The header is a two-column band, 577px of headline against 580px of
 * body with a 43px gutter, not a stack. Cards are 374px wide, 24px
 * radius, white with no border, and hold an 80px avatar, the name in
 * Poppins 20/600, the role in brand blue, then the quote.
 */
export function TestimonialsSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".testimonial-header > *", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative overflow-hidden bg-surface-2">
      <TestimonialGlows />

      <div className="relative mx-auto max-w-[1200px] px-5 py-20 md:px-0 md:py-24">
        <div className="testimonial-header grid gap-8 lg:grid-cols-[577fr_580fr] lg:gap-[43px]">
          <h2 className="t-display-lg self-end text-ink">
            Discover What Our Community Is Saying
          </h2>
          <p className="t-body-l text-body">
            At ByteSpace, our vibrant community of learners and creators is at
            the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on
            our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="testimonial-card flex"
            >
              <figure className="flex w-full flex-col rounded-lg bg-white p-6 shadow-e2">
                <Avatar src={t.avatar} size={80} alt={t.name} />
                <figcaption className="mt-6">
                  <p className="t-display-xs text-ink">{t.name}</p>
                  <p className="mt-1 text-[18px] leading-[1.6] text-brand">
                    {t.role}
                  </p>
                </figcaption>
                <blockquote className="t-body-m mt-6 text-body">
                  {t.quote}
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
