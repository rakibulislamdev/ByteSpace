"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric stat up once, when it scrolls into view.
 *
 * Uses rAF against a ref rather than React state per frame - the value
 * only commits to state at the end, so the React tree re-renders once
 * instead of sixty times.
 */
export function CountUp({
  value,
  duration = 1400,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const target = Number(value.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(target) || target === 0) return;

    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const suffix = value.replace(/[\d.,]/g, "");
    let raf = 0;
    let start: number | null = null;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const step = (now: number) => {
          if (start === null) start = now;
          const t = Math.min((now - start) / duration, 1);
          // ease-out: fast first, settles gently
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
