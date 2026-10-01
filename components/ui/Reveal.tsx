"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Origin = "up" | "left" | "scale" | "fade";

export function Reveal({
  children,
  delay = 0,
  from = "up",
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  from?: Origin;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      let fromProps: gsap.TweenVars = { opacity: 0 };
      if (from === "up") fromProps.y = 40;
      if (from === "left") fromProps.x = -40;
      if (from === "scale") fromProps.scale = 0.9;

      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        ...fromProps,
        duration: 0.6,
        delay: delay / 1000,
        ease: "power2.out",
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  step = 70,
  from = "up",
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode[];
  step?: number;
  from?: Origin;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "ul" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      let fromProps: gsap.TweenVars = { opacity: 0 };
      if (from === "up") fromProps.y = 40;
      if (from === "left") fromProps.x = -40;
      if (from === "scale") fromProps.scale = 0.9;

      gsap.from((ref.current as HTMLElement).children, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        ...fromProps,
        duration: 0.6,
        stagger: step / 1000,
        ease: "power2.out",
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
