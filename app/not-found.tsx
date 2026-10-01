"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";

// export const metadata: Metadata = { title: "Page not found" };

/**
 * 404: a brand-blue band carrying the numeral, the message and the way
 * back, then the footer. The numeral is 480px Poppins with a vertical
 * gradient that fades the lime out toward the bottom of the glyphs, so
 * it reads as a soft cut rather than a flat fill.
 */
export default function NotFound() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".notfound-anim > *", {
        y: 40,
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
      <section className="relative overflow-hidden bg-brand text-on-dark">
        <SiteHeader />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        <div className="notfound-anim relative mx-auto flex max-w-[1200px] flex-col items-center px-5 pt-16 pb-24 text-center md:px-0 md:pt-20 md:pb-32">
          <p
            aria-hidden="true"
            className="font-[family-name:var(--font-poppins)] text-[clamp(180px,33vw,480px)] leading-[0.85] font-semibold pt-4"
            style={{
              letterSpacing: "-0.01em",
              backgroundImage:
                "linear-gradient(to bottom, rgba(212,251,32,1) 0%, rgba(212,251,32,0.96) 25%, rgba(212,251,32,0.81) 50%, rgba(212,251,32,0.61) 68%, rgba(255,255,255,0) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            404
          </p>

          <h1 className="t-display-xl mt-10 max-w-[934px] text-on-dark">
            The page you are looking for doesn&rsquo;t exist
          </h1>

          <p className="t-body-l mt-10 text-[#e5e6e8]">
            Try to use a correct url or go back to homepage to start again
          </p>

          <Button href="/" variant="lime" size="lg" className="mt-8">
            Back to Home
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
