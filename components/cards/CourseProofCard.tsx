/**
 * Floating proof card for the hero: a course name and its two headline
 * numbers. Used to demonstrate the catalogue at a glance.
 */
import type { ReactNode } from "react";

export function CourseProofCard({
  title,
  meta,
  className = "",
}: {
  title: string;
  /** Secondary line, e.g. "200 Courses · 1000+ Students". */
  meta: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-[208px] rounded-lg bg-white p-4 ${className}`}>
      <p className="t-h-s text-ink">{title}</p>
      <p className="t-body-s mt-1 text-body">{meta}</p>
    </div>
  );
}
