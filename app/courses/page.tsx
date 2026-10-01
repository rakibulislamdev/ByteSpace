"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CourseCard } from "@/components/ui/CourseCard";
import { Icon, type IconName } from "@/components/ui/icons";
import { Pagination } from "@/components/ui/Pagination";
import { SearchField } from "@/components/ui/SearchField";
import { ParallaxGrid } from "@/components/ui/ParallaxGrid";
import { Stagger } from "@/components/ui/Reveal";
import { categoryFilters, courses } from "@/lib/data";

const FILTERS: { label: string; icon: IconName }[] = [
  { label: "Filter", icon: "filter" },
  { label: "Level", icon: "chart-bar" },
  { label: "Category", icon: "shapes" },
];

const ALL_COURSES = [...courses, ...courses, ...courses, ...courses]; // Adding one more to make 16 items for pagination demo
const ITEMS_PER_PAGE = 6;

export default function CoursesPage() {
  const container = useRef(null);
  const [activeCategory, setActiveCategory] = useState(categoryFilters[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [shuffledCourses, setShuffledCourses] = useState(ALL_COURSES);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory || isShuffling) return;
    setIsShuffling(true);

    gsap.to(".course-card-wrapper", {
      opacity: 0,
      scale: 0.8,
      rotation: () => Math.random() * 16 - 8,
      y: 20,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(cat);
        const shuffled = [...ALL_COURSES].sort(() => Math.random() - 0.5);
        setShuffledCourses(shuffled);
        setCurrentPage(1);
        setTimeout(() => setIsShuffling(false), 20);
      }
    });
  };

  useEffect(() => {
    // Initial shuffle on mount to prevent SSR mismatch logic if any
    const shuffled = [...ALL_COURSES].sort(() => Math.random() - 0.5);
    setShuffledCourses(shuffled);
  }, []);

  
  const totalPages = Math.ceil(shuffledCourses.length / ITEMS_PER_PAGE);
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  const displayCourses = shuffledCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".course-header > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      if (!isShuffling) {
        // Force clear any stuck transforms from interrupted animations first
        gsap.set(".course-card-wrapper", { clearProps: "all" });
        
        gsap.fromTo(
          ".course-card-wrapper",
          { opacity: 0, scale: 0.8, y: -20, rotation: () => Math.random() * 16 - 8 },
          { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)" }
        );
      }
    },
    { dependencies: [shuffledCourses, currentPage, isShuffling], scope: container }
  );

  return (
    <div ref={container}>
      <section className="relative overflow-hidden bg-brand text-on-dark">
        <SiteHeader />
        <ParallaxGrid />

        <div className="course-header relative mx-auto max-w-[624px] px-5 pt-10 pb-14 text-center md:px-0 md:pt-14">
          <h1 className="t-display-md text-on-dark">Find Your Next Course</h1>
          <SearchField id="course-search" className="mt-6" />
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

          <ul className="mt-6 flex flex-wrap items-center justify-between gap-4">
            {categoryFilters.slice(0, 8).map((c) => {
              const active = activeCategory === c;
              return (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(c)}
                    className={[
                      "press t-body-l block rounded-full px-4 py-3 font-medium transition-colors",
                      active ? "bg-lime text-ink" : "bg-surface text-muted hover:text-ink hover:bg-surface-2",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayCourses.map((course, i) => (
              <div key={`${course.slug}-${i}-${currentPage}`} className="course-card-wrapper flex w-full">
                <CourseCard
                  course={course}
                  priority={i < 3}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <Pagination 
                page={currentPage} 
                pages={pagesArray} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
