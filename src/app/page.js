"use client";

import styles from "./home.module.css";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

import Preloader from "@/components/Preloader";
import Copy from "@/components/Copy";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import FocusAreas from "@/components/FocusAreas";
import Marquee from "@/components/Marquee";
import ProcessSteps from "@/components/ProcessSteps";
import StatementBanner from "@/components/StatementBanner";
import BanksSection from "@/components/BanksSection";

import {
  HOME_COPY_BASE_DELAY,
  PRELOADER_COPY_BASE_DELAY,
  PRELOADER_EASE,
  PRELOADER_HERO_SCALE_DURATION,
  markPreloaderSeen,
  shouldShowPreloader,
} from "@/lib/preloader";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger);

if (typeof window !== "undefined") {
  CustomEase.create("preloaderHop", PRELOADER_EASE);
}

export default function Home() {
  const heroRef = useRef(null);
  const ctasRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const aboutImageRef = useRef(null);
  const lenis = useLenis();
  const showPreloader = shouldShowPreloader();
  const wait = showPreloader
    ? PRELOADER_COPY_BASE_DELAY - HOME_COPY_BASE_DELAY
    : 0;

  useEffect(() => {
    return () => {
      markPreloaderSeen();
    };
  }, []);

  const expandHero = () => {
    const hero = heroRef.current;
    if (!hero) return Promise.resolve();

    hero.removeAttribute("data-hero-intro");

    return new Promise((resolve) => {
      gsap.fromTo(
        hero,
        {
          scale: 0,
          rotation: -20,
          autoAlpha: 1,
          transformOrigin: "center center",
          force3D: true,
        },
        {
          scale: 1,
          rotation: 0,
          duration: PRELOADER_HERO_SCALE_DURATION,
          ease: "preloaderHop",
          force3D: true,
          overwrite: true,
          onComplete: () => {
            gsap.delayedCall(0.35, () => {
              lenis?.start();
              ScrollTrigger.refresh();
            });
            resolve();
          },
        }
      );
    });
  };

  useGSAP(
    () => {
      const btns = gsap.utils.toArray(ctasRef.current?.children);
      if (!btns.length) return;

      gsap.set(btns, { y: 300 });

      gsap.to(btns, {
        y: 0,
        duration: 0.75,
        delay: wait + 0.75,
        stagger: 0.25,
        ease: "power3.out",
      });
    },
    { scope: ctasRef, dependencies: [wait] }
  );

  useGSAP(
    () => {
      const card = aboutImageRef.current;
      if (!card) return;

      gsap.set(card, { y: 300, opacity: 0 });
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: aboutSectionRef, dependencies: [] }
  );

  return (
    <>
      {showPreloader ? <Preloader onExpand={expandHero} /> : null}

      <section
        ref={heroRef}
        className={styles.hero}
        data-hero-intro={showPreloader ? "" : undefined}
      >
        <div className={styles.heroBg}>
          <img src="/images/home/hero.jpg" alt="" />
        </div>
        <div className={styles.heroHeader}>
          <Copy variant="flicker" animateOnScroll={false} delay={wait + 1}>
            <SectionHeader
              variant="v2"
              bullet
              left="Your Financial Partner"
              right="Melbourne, Australia"
            />
          </Copy>
        </div>
        <div className={`container ${styles.heroContent}`}>
          <Copy animateOnScroll={false} delay={wait + 0.75}>
            <h1 className={styles.heroTitle}>Smarter loans. Stronger futures.</h1>
          </Copy>
          <div ref={ctasRef} className={styles.heroCtas}>
            <Button
              variant="primary"
              href="/contact"
              className={styles.ctaPrimary}
            >
              Get your free consultation
            </Button>
            <Button
              variant="secondary"
              href="/firm"
              className={styles.ctaSecondary}
            >
              About RND
            </Button>
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} className={styles.about}>
        <Copy variant="flicker">
          <SectionHeader bullet left="Who we are" right="Our approach" />
        </Copy>
        <div className={`container ${styles.aboutCols}`}>
          <div className={styles.aboutCol}>
            <div ref={aboutImageRef} className={styles.imageCard}>
              <div className={styles.image}>
                <img
                  src="/images/nitin/img3.jpg"
                  alt="RND Financials Melbourne"
                />
              </div>
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <Copy>
              <h4 data-copy-text="true">
                <span className={styles.accent}>RND Financials</span> is a Melbourne-based mortgage brokerage specialising in
                home loans, asset finance, business lending, and refinancing solutions.
                We compare hundreds of loan products to find the right fit for your goals and budget.
              </h4>
            </Copy>
          </div>
        </div>
      </section>

      <BanksSection />

      <FocusAreas />

      <Marquee />

      <ProcessSteps />

      <StatementBanner />
    </>
  );
}
