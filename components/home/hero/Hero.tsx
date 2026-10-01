"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SearchField } from "@/components/ui/SearchField";
import {
  CourseProofCard,
  HappyStudentsCard,
  LearningProgressCard,
} from "@/components/cards";
import { HeroOrnaments } from "./HeroOrnaments";
import { ParallaxGrid } from "@/components/ui/ParallaxGrid";


export function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Create a timeline for the hero elements
      const tl = gsap.timeline();

      tl.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Animate the floating cards
      gsap.from(".hero-card", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
        delay: 0.8
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative overflow-hidden bg-brand text-on-dark">
      <SiteHeader />
      <ParallaxGrid />
      <HeroOrnaments />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-5 pt-6 pb-0 text-center md:px-0 md:pt-10">
        <h1 className="hero-anim t-display-xl max-w-[980px] text-on-dark">
          Get Access to Hundreds Courses Available
        </h1>

        <p className="hero-anim t-body-l mt-7 max-w-[820px] text-on-dark-muted">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>

        <SearchField id="hero-search" className="hero-anim mt-8 max-w-[581px]" />

        <figure className="hero-anim relative mt-6 w-full md:mt-10 md:h-[600px]">
          <Image
            src="/assets/creator-photo.png"
            alt=""
            width={578}
            height={541}
            priority
            className="mx-auto block w-full max-w-full object-contain md:absolute md:bottom-0 md:left-1/2 md:h-[600px] md:w-auto md:max-w-none md:-translate-x-1/2"
          />

          <CourseProofCard
            title="UI/UX Design"
            meta={
              <>
                200 Courses <span className="mx-1">&bull;</span> 1000+ Students
              </>
            }
            className="hero-card absolute top-[150px] left-[6%] hidden lg:block"
          />
          <LearningProgressCard className="hero-card absolute top-[165px] right-[8%] hidden lg:block" />
          <HappyStudentsCard className="hero-card absolute bottom-[190px] left-[14%] hidden lg:block" />
        </figure>
      </div>
    </section>
  );
}
