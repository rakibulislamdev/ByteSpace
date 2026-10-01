"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {

  CreatorRevenueCard,
  HappyStudentsCard,
  LearningProgressCard,
} from "@/components/cards";
import { CountUp } from "@/components/ui/CountUp";
import { CourseCard } from "@/components/ui/CourseCard";
import { FilterableCourseGrid } from "@/components/ui/FilterPills";
import { Icon } from "@/components/ui/icons";
import { GrowthGlows } from "@/components/ui/SectionGlow";
import { CategoryIcon } from "@/components/ui/CategoryIcons";
import { TintedShape } from "@/components/ui/TintedShape";
import {
  categoryFilters,
  courses,
  creatorBenefits,
  learningPaths,
} from "@/lib/data";
import Image from "next/image";

/** Grey partner-logo strip that sits directly under the hero. */
export function LogoStrip() {
  return (
    <section className="bg-surface" aria-label="Partners">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-16 gap-y-6 px-5 py-12 md:px-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="t-h-m flex items-center gap-2 text-muted opacity-70"
          >
            <Icon name="shapes" size={20} />
            Logoipsum
          </span>
        ))}
      </div>
    </section>
  );
}

/**
 * "Discover Your Passion" - heading, the filter pills and the grid.
 * The pills filter the grid, so both live in one client boundary.
 */
export function DiscoverSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".discover-header", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      }).from(".discover-grid", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.2");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-0 md:py-24">
        {/* Centred as a block, so the copy centres on the page rather than
            inside a left-anchored column. */}
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="discover-header t-display-lg text-brand-deep">
            Discover Your Passion, Build Your Skills
          </h2>
          <p className="discover-header t-body-l mt-5 text-body">
            At Bytespace Courses, we bring you closer to life-changing
            knowledge. Explore a variety of courses across different fields,
            from cooking to IT programming, that will help you enhance your
            career and personal growth.
          </p>
        </div>

        <div className="discover-grid">
          <FilterableCourseGrid rows={[categoryFilters]} courses={courses} />
        </div>
      </div>
    </section>
  );
}

/**
 * "Explore Diverse Learning Paths" - the six category tiles.
 *
 * The design gives each tile a fixed 167x167 box with a 24px radius and a
 * hairline border, holding a 60px lime disc (radius 40) above a 20px
 * label, on a 40px gutter. The tiles are a fixed size rather than
 * stretching, so the row is laid out with explicit gaps rather than
 * equal fractions.
 */
export function LearningPathsSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".path-tile", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-20 md:px-0 md:pb-24">
        <div className="mx-auto max-w-[917px] text-center">
          <h2 className="t-display-md text-brand-deep">
            Explore Diverse Learning Paths at Bytespace
          </h2>
          <p className="t-body-l mt-5 text-subtle">
            At ByteSpace, we believe in empowering individuals through knowledge.
            Our diverse range of course paths ensures that learners can find the
            perfect fit for their interests and goals.
          </p>
        </div>

        {/* 36px rather than the design's 40px: six 167px tiles plus five
            40px gutters is 1202px, two wider than the 1200px page
            container, which pushed the sixth tile onto its own row. */}
        {/* A grid, not a wrapping flex row: six fixed 167px tiles cannot
            fit two across a 336px phone, so flex put one per row and the
            section ran six screens tall. The tile scales to its cell
            below lg and takes the designed 167px from there. */}
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {learningPaths.map((path) => (
            <li key={path.label} className="path-tile">
              <a
                href="#"
                className="press mx-auto flex aspect-square w-full max-w-[167px] flex-col items-center justify-center gap-3 rounded-lg border border-line bg-white transition-colors duration-200 hover:border-ink"
              >
                <span className="grid size-[60px] place-items-center rounded-[40px] bg-lime">
                  <CategoryIcon name={path.icon} size={36} className="text-ink" />
                </span>
                <span className="t-h-m text-ink">{path.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
/**
 * The two-part feature band from Figma "Frame 15": growth stats, then the
 * creator block, sharing one glow field.
 *
 * The glows must live on a single wrapper. Split across two sections each
 * with overflow-hidden, the ellipses that bleed in from outside the frame
 * get clipped away and the band loses its colour entirely.
 */
export function FeatureBand({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".feature-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }).from(".feature-image > *", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
      }, "-=0.4");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative overflow-hidden bg-surface-2">
      <GrowthGlows />

      {/* Row 1: growth. Offsets are the design's, measured from the
          621px right-hand column: card at 0,0, the photographer at 0,12
          overlapping it, the progress card at 345,213 and the squiggle
          at 406,67. */}
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 pt-20 pb-16 md:px-0 md:pt-24 lg:grid-cols-[574fr_621fr] lg:gap-16">
        <div className="feature-content">
          <h2 className="t-display-lg text-ink">
            Your Path to Professional Growth Starts Here!
          </h2>
          <p className="t-body-l mt-5 max-w-[520px] text-body">
            Explore our curated selection of courses tailored to enhance your
            capabilities and accelerate your career journey. Whether you are
            looking to sharpen specific skills, gain industry expertise, or
            embark on a new career path entirely, we have the resources you
            need.
          </p>

          <dl className="mt-8 flex gap-12">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp
                    value={s.value}
                    className="t-display-md block text-brand"
                  />
                  <span className="t-body-l mt-1 block text-body">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The designed overlap needs the full 621px column. Below lg the
            pieces stack instead, because a 577px photograph has nowhere
            to overlap a 373px card on a 375px screen. */}
        <div className="feature-image relative mt-10 flex flex-col items-center gap-6 lg:mt-0 lg:block lg:h-[552px]">
          <div className="w-full max-w-[373px] lg:absolute lg:top-0 lg:left-0 lg:max-w-none">
            <CourseCard course={courses[0]} />
          </div>

          <Image
            src="/assets/creator-photo.png"
            alt=""
            width={577}
            height={540}
            className="w-full max-w-[373px] object-contain lg:pointer-events-none lg:absolute lg:top-[12px] lg:left-0 lg:w-[577px] lg:max-w-none"
          />

          {/* The photograph is a cutout whose frame ends mid-torso, so a
              clean 24px gap below it reads as a sliced person. Pulling the
              card up by 48px against the 24px gutter leaves a 24px overlap,
              which both hides the cut and mirrors the designed overlap the
              absolute placement produces at lg. */}
          <div className="relative z-10 -mt-12 w-full max-w-[373px] lg:contents">
            <LearningProgressCard className="lg:absolute lg:top-[213px] lg:left-[345px]" />
          </div>

          <TintedShape
            src="/assets/hero-float-6.png"
            tint="lime"
            className="hidden lg:absolute lg:top-[67px] lg:left-[406px] lg:block lg:size-[215px]"
          />
        </div>
      </div>

      {/* Row 2: creator. Offsets from the 541px left-hand column. */}
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 pb-20 md:px-0 md:pb-28 lg:grid-cols-[541fr_580fr]">
        <div className="relative mt-10 flex flex-col items-center gap-6 lg:mt-0 lg:block lg:h-[596px]">
          <div className="flex w-full max-w-[373px] flex-col gap-4 lg:contents">
            <CreatorRevenueCard
              className="lg:absolute lg:top-[44px] lg:left-0"
              title="Total Revenue"
              period="July 1-28"
              amount="$120.29"
            />
            <CreatorRevenueCard
              className="lg:absolute lg:top-[194px] lg:left-0"
              title="Year to Date"
              period="2023"
              amount="$1,200.38"
            />
          </div>

          <Image
            src="/assets/hero-person.png"
            alt=""
            width={435}
            height={596}
            className="w-full max-w-[373px] object-contain lg:absolute lg:top-0 lg:left-[28px] lg:w-[435px] lg:max-w-none"
          />

          <TintedShape
            src="/assets/hero-float-6.png"
            tint="lime"
            className="hidden lg:absolute lg:top-[114px] lg:left-[305px] lg:block lg:size-[215px]"
          />

          {/* Same overlap reasoning as the growth row above. */}
          <div className="relative z-10 -mt-12 w-full max-w-[373px] lg:contents">
            <HappyStudentsCard className="lg:absolute lg:top-[413px] lg:left-[283px]" />
          </div>
        </div>

        <div>
          <h2 className="t-display-lg text-ink">
            Create &amp; Manage Courses Easily.
          </h2>
          <p className="t-body-l mt-5 max-w-[574px] text-body">
            <strong className="font-medium text-ink">ByteSpace</strong> supports
            individuals or entities in the creation, publication, and
            administration of educational courses.
          </p>
          <ul className="mt-7 flex flex-col gap-4">
            {creatorBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand">
                  <Icon name="check-circle" size={16} className="text-white" />
                </span>
                <span className="t-h-s text-ink">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
