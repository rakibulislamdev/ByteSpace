import type { Course } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "./Avatar";
import { Icon } from "./icons";

const CARD_AVATARS = [
  "/assets/avatar-01.png",
  "/assets/avatar-02.png",
  "/assets/avatar-03.png",
  "/assets/avatar-04.png",
];

export function CourseCard({
  course,
  priority = false,
}: {
  course: Course;
  priority?: boolean;
}) {
  return (
    <article className="card-lift group h-full w-full rounded-lg">
      <Link
        href={`/courses/${course.slug}`}
        className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-line bg-white"
      >
        {/* Thumbnail: 341x195 at 16px inset, 12px radius */}
        <div className="relative mx-4 mt-4 h-[195px] shrink-0 overflow-hidden rounded-sm">
          <Image
            src={course.thumb}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 373px"
            className="card-zoom object-cover"
          />
          {/* Three pills do not fit across a 320px card, and wrapping them
              to two lines spills them out of the thumbnail. They tighten on
              small screens and take the designed size from sm up. */}
          <ul className="absolute bottom-2 left-2 flex gap-1.5 sm:bottom-3 sm:left-3 sm:gap-3">
            <MetaPill>{course.lessons} Lessons</MetaPill>
            <MetaPill>{course.duration}</MetaPill>
            <MetaPill>{course.comments} Comments</MetaPill>
          </ul>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="t-display-xs truncate text-ink">{course.title}</h3>
              <p className="t-body-s mt-1 text-body">
                by <span className="text-brand">{course.author}</span>
              </p>
            </div>
            <span className="t-h-s flex shrink-0 items-center gap-0.5 text-body">
              {course.rating.toFixed(1)}
              <Icon name="star-muted" size={16} className="text-line" />
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="t-label inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-muted">
              <Icon name="chart-bar" size={14} />
              {course.level}
            </span>
            <span className="flex items-center">
              {CARD_AVATARS.map((src, i) => (
                <Avatar
                  key={src}
                  src={src}
                  size={32}
                  alt=""
                  className="ring-2 ring-white"
                  // -8px overlap, matching the Figma auto-layout gap of -8
                  {...{ style: { marginLeft: i === 0 ? 0 : -8 } }}
                />
              ))}
              {/* 32px lime circle closing the stack, per the design. */}
              <span className="t-label ml-1 grid size-8 shrink-0 place-items-center rounded-full bg-lime text-ink">
                {course.students}
              </span>
            </span>
          </div>

          <p className="mt-auto flex items-baseline gap-1.5">
            <span className="t-display-xs text-brand">{course.price}</span>
            <span className="t-body-s text-body">{course.period}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <li className="t-label shrink-0 whitespace-nowrap rounded-full bg-white/70 px-2 py-1 text-[10px] leading-tight text-body backdrop-blur-[2px] sm:px-3 sm:py-1.5 sm:text-[12px] sm:leading-normal">
      {children}
    </li>
  );
}
