"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseHero } from "./CourseHero";
import { CourseTabs } from "./CourseTabs";
import { EnrolCard } from "./EnrolCard";
import { Reveal } from "@/components/ui/Reveal";
import { CourseBody } from "./CourseBody";
import { LessonsBody } from "./LessonsBody";
import { ReviewsBody } from "./ReviewsBody";

export function CourseLayout({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("about");
  const tabContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tabContentRef.current) {
        gsap.fromTo(
          tabContentRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    },
    { dependencies: [activeTab] }
  );

  return (
    <>
      <CourseHero />

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-20 md:px-0 md:pt-8 md:pb-28">
          <div className="grid gap-8 lg:grid-cols-[1fr_412px] lg:gap-10">
            {/* Left Column: Tabs and Content */}
            <div>
              <Reveal from="fade">
                <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </Reveal>
              <div ref={tabContentRef} className="mt-12">
                {activeTab === "about" && <CourseBody />}
                {activeTab === "lessons" && <LessonsBody />}
                {activeTab === "reviews" && <ReviewsBody />}
              </div>
            </div>

            {/* Right Column: Enrol Card */}
            <div className="relative lg:-mt-[575px]">
              <EnrolCard />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
