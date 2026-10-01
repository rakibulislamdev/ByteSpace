"use client";

import { useEffect, useRef } from "react";

/**
 * Learning-progress bar. Animates its fill once on mount, then stops.
 *
 * The fill animates `transform: scaleX` (GPU-composited) from the left
 * edge rather than `width`, and the class is applied on a ref so there
 * is no re-render. Under prefers-reduced-motion globals.css collapses
 * the transition, so no JS branch is needed here.
 */
export function ProgressBar({
  value,
  className = "",
}: {
  /** 0-100 */
  value: number;
  className?: string;
}) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const id = requestAnimationFrame(() => fill.classList.add("is-filled"));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-surface ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={fillRef}
        className="progress-fill h-full rounded-full bg-lime"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
