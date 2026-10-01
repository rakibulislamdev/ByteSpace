"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";
import { CourseCard } from "@/components/ui/CourseCard";
import { Icon, type IconName } from "@/components/ui/icons";
import { ParallaxGrid } from "@/components/ui/ParallaxGrid";
import { courses } from "@/lib/data";

// export const metadata: Metadata = { title: "Creator" };

const FILTERS: { label: string; icon: IconName }[] = [
  { label: "Filter", icon: "filter" },
  { label: "Level", icon: "chart-bar" },
  { label: "Category", icon: "shapes" },
];

export default function CreatorPage() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".animate-in", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      {/* Blue band: identity, bio, stats, follow */}
      <section className="relative overflow-hidden bg-brand text-on-dark">
        <SiteHeader />
        <ParallaxGrid />

        <div className="relative mx-auto max-w-[1200px] px-5 pt-10 pb-16 md:px-0 md:pt-12">
          <div className="animate-in flex items-start gap-6">
            <Image
              src="/assets/avatar-11.png"
              width={100}
              height={100}
              alt="PurePearl Studio"
              className="shrink-0 rounded-3xl object-cover"
            />
            <div className="min-w-0 flex-1 mt-1">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="t-display-md text-on-dark">PurePearl Studio</h1>
                <span className="t-body-l shrink-0 rounded-full bg-lime px-4 py-1.5 text-ink">
                  Creator
                </span>
              </div>
              <p className="t-body-l mt-2 text-on-dark">
                Passionate UI/UX, Web designer
              </p>
            </div>
          </div>

          <div className="animate-in mt-8 max-w-[1000px] space-y-2">
            <p className="t-body-l text-on-dark">
              Welcome to the creative world of [Creator's Name]. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's
              explore and learn together!
            </p>
            <p className="t-body-l text-on-dark">
              Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story.
              Explore the world of creativity with me.
            </p>
          </div>

          <div className="animate-in mt-10 flex flex-wrap items-start justify-between gap-6">
            <ul className="flex flex-wrap gap-4">
              <li className="t-h-s flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-ink">
                <span className="text-brand">3</span>
                Products
              </li>
              <li className="t-h-s flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-ink">
                <span className="text-brand">12</span>
                Followers
              </li>
            </ul>

            <button
              type="button"
              className="press t-h-s shrink-0 rounded-full bg-lime px-8 py-2.5 text-ink"
            >
              Follow
            </button>
          </div>
        </div>
      </section>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-0 md:py-16">
          <div className="flex w-full items-start justify-between gap-4 overflow-x-auto no-scrollbar pt-1 pb-1">
            <ul className="flex flex-nowrap items-center gap-3">
              {FILTERS.map((f) => (
                <li key={f.label}>
                  <button
                    type="button"
                    className="press t-body-l flex h-12 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-5 text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <Icon name={f.icon} size={20} className="text-ink" />
                    {f.label}
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="press t-body-l flex h-12 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-5 text-muted transition-colors duration-200 hover:text-ink"
            >
              <Icon name="align-left" size={20} className="text-ink" />
              Most relevant
            </button>
          </div>

          <div className="mt-12 grid auto-rows-[384px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} priority />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
