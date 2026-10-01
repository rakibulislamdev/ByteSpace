"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function ParallaxGrid() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.to(ref.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-[30%] h-[160%]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
      }}
    />
  );
}
