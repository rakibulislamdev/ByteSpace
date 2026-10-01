"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@/components/ui/icons";
import { TintedShape } from "@/components/ui/TintedShape";
import { courses } from "@/lib/data";

/**
 * Shared shell for Sign in and Register, 1440x1024.
 *
 * The blue panel carries the pitch copy on the left, two course cards
 * scattered over each other, the lime social-proof card and three
 * ornaments, with the 579x784 form card on the right.
 *
 * Those scattered elements are positioned from the design's own frame
 * coordinates rather than relative to the text, so they sit where the
 * frame puts them however the copy above them wraps. They live in one
 * layer constrained to the 1200px content column, which is why the
 * x values are the design's minus the 120px gutter.
 */
export function AuthShell({
  pitch,
  body,
  children,
}: {
  pitch: string;
  body: string;
  children: ReactNode;
}) {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".auth-pitch > *", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
      .from(".auth-form", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .from(".auth-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.5)",
      }, "-=0.4");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative overflow-hidden bg-brand text-on-dark min-h-screen lg:min-h-[1024px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-12 md:px-0 md:pb-24 lg:pb-0">
        <div className="flex h-[120px] items-center">
          <LogoOnly />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_579px]">
          {/* Left: pitch copy */}
          <div className="auth-pitch max-w-[475px]">
            <h1 className="t-display-xs text-on-dark">{pitch}</h1>
            <p className="t-body-l mt-4 text-on-dark">{body}</p>
          </div>

          {/* Right: the form card */}
          <div className="auth-form relative z-10">
            {/* The design's card insets its content by 63px left and 61px
                top, not a flat 36px - the old value left the fields
                floating in the card on desktop. On a 375px screen that
                padding cannot hold: 72px of a 321px card is padding and
                the inputs drop to 249px, so it steps down to 20px. */}
            <div className="rounded-lg bg-white p-5 shadow-e5 md:p-[61px] md:pl-[63px]">
              {children}
            </div>
          </div>
        </div>

        {/* Scattered cards, social proof and ornaments, in frame coordinates. */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {/* Paint order follows the source frame: the lower-left card is
              the earlier sibling, so the upper-right one sits over it. */}
          <div className="auth-card absolute top-[394px] left-[2px] w-[373px] opacity-95">
            <AuthCard index={1} />
          </div>
          <div className="auth-card absolute top-[305px] left-[113px] w-[373px]">
            <AuthCard index={2} />
          </div>

          <div className="auth-card absolute top-[740px] left-[228px] w-[258px] rounded-md bg-lime p-4">
            <p className="t-h-s text-ink">Happy Students</p>
            <p className="text-[10px] text-[#424348]">4.5 (240)</p>
            <div className="mt-2 flex items-center">
              {STACK.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className="shrink-0 rounded-full object-cover ring-2 ring-lime"
                  {...{ style: { marginLeft: i === 0 ? 0 : -8 } }}
                />
              ))}
              <span className="ml-2 grid size-8 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-bold text-on-dark">
                2K+
              </span>
            </div>
          </div>

          <TintedShape
            src="/assets/hero-float-6.png"
            tint="lime"
            className="auth-card absolute top-[702px] left-[-23px] size-[188px]"
          />
          <TintedShape
            src="/assets/hero-float-4.png"
            tint="lime"
            className="auth-card absolute top-[320px] left-[31px] size-[146px]"
          />
          <TintedShape
            src="/assets/hero-float-3.png"
            tint="white"
            className="auth-card absolute top-[626px] left-[350px] size-[175px]"
          />
        </div>
      </div>
    </section>
  );
}

const STACK = [
  "/assets/avatar-05.png",
  "/assets/avatar-06.png",
  "/assets/avatar-07.png",
  "/assets/avatar-08.png",
];

function LogoOnly() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-[10px]"
      aria-label="ByteSpace home"
    >
      <svg width="29" height="32" viewBox="0 0 29 32" aria-hidden="true">
        <path
          fill="#d4fb20"
          d="M0 32V0h14.5C22.5 0 27 3.4 27 9c0 3.5-1.9 6.2-5 7.4 3.9 1.1 6.1 4 6.1 7.7C28.1 28.9 23.3 32 15 32H0Zm8-13.7h5.6c3.1 0 4.7-1.2 4.7-3.6 0-2.3-1.6-3.5-4.7-3.5H8v7.1Zm0 7.2h6.2c3.4 0 5.1-1.3 5.1-3.8 0-2.5-1.7-3.8-5.1-3.8H8V25.5Z"
        />
      </svg>
    </Link>
  );
}

/**
 * Course card for the auth panel. Same 373x384 card as the listing, but
 * the auth frames carry the deep-purple price and a blue student chip
 * rather than the lime one the listing uses.
 */
function AuthCard({ index }: { index: number }) {
  const course = courses[index] ?? courses[0];
  return (
    <article className="flex h-[384px] w-[373px] flex-col overflow-hidden rounded-lg bg-white">
      <div className="relative mx-4 mt-4 h-[195px] shrink-0 overflow-hidden rounded-sm">
        <Image
          src={course.thumb}
          alt=""
          fill
          sizes="373px"
          className="object-cover"
        />
        <ul className="absolute bottom-3 left-3 flex gap-3">
          {[
            `${course.lessons} Lessons`,
            course.duration,
            `${course.comments} Comments`,
          ].map((label) => (
            <li
              key={label}
              className="t-label rounded-full bg-white/60 px-3 py-1.5 text-body"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="t-display-xs truncate text-ink">{course.title}</h3>
          <span className="t-h-s shrink-0 text-body">{course.rating}</span>
        </div>
        <p className="t-body-s mt-1 text-body">by {course.author}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="t-label rounded-full bg-surface px-3 py-1.5 text-muted">
            {course.level}
          </span>
          <span className="t-label ml-auto grid size-8 place-items-center rounded-full bg-brand text-white">
            {course.students}
          </span>
        </div>
        <p className="mt-auto flex items-baseline gap-1.5">
          <span className="t-display-xs text-purple">{course.price}</span>
          <span className="t-body-s text-body">{course.period}</span>
        </p>
      </div>
    </article>
  );
}

/** The small blue link-style line above the form heading. */
export function AuthKicker({ children }: { children: ReactNode }) {
  return <p className="t-body-l text-brand">{children}</p>;
}

/** Labelled field matching the design's label-over-input block. */
export function AuthField({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-label text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="t-body-l h-[46px] w-full rounded-sm border border-line bg-white px-4 text-ink sm:h-[52px] transition-colors duration-200 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

/** Hairline with a word centred in it, for the social sign-in row. */
export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="t-body-l text-subtle">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Circular social buttons, as on the sign-in card. */
export function SocialButtons() {
  return (
    <div className="flex justify-center gap-4">
      {(["facebook", "google"] as const).map((name) => (
        <button
          key={name}
          type="button"
          aria-label={
            name === "facebook"
              ? "Continue with Facebook"
              : "Continue with Google"
          }
          className="press grid size-10 place-items-center rounded-full bg-white text-ink transition-colors duration-200 hover:bg-surface"
        >
          <Icon name={name} size={20} />
        </button>
      ))}
    </div>
  );
}
