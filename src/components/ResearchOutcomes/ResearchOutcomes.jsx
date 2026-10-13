"use client";

import styles from "./ResearchOutcomes.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckIcon } from "@unlocalhosted/dither-icons";

import Copy from "@/components/Copy";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const OUTCOMES = [
  "No fees charged to you, ever",
  "Access to 100+ trusted lenders",
  "Compare 500+ loan products",
  "Pre-approval in as little as 48 hours",
  "Expert guidance for complex income",
  "Self-employed and contractor specialists",
  "Transparent commission disclosure",
  "Support from application to settlement",
];

export default function ResearchOutcomes({
  image = "/images/loans/article-2.jpg",
  alt = "Why choose RND Financials",
}) {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const imageCardRef = useRef(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (list) {
        const checks = list.querySelectorAll(`.${styles.check}`);
        if (checks.length) {
          gsap.set(checks, { scale: 0, transformOrigin: "center", force3D: false });
          gsap.to(checks, {
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            force3D: false,
            scrollTrigger: {
              trigger: list,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      const card = imageCardRef.current;
      if (card) {
        gsap.set(card, { y: 300, opacity: 0 });
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section ref={sectionRef} className={styles.researchOutcomes}>
      <div className={`container ${styles.inner}`}>
        <Copy variant="flicker">
          <SectionHeader
            bullet
            left="What you get"
            right="Service that delivers"
          />
        </Copy>

        <div className={styles.logoWrapper}>
          <img
            src="/images/rnd-logo.png"
            alt="RND Financials"
            className={styles.logo}
          />
        </div>

        <Copy>
          <h2 className={styles.title} data-copy-text="true">
            Why choose
            <br />
            <span className={styles.accent}>RND</span>
          </h2>
        </Copy>

        <div className={styles.leftCol}>
          <Copy>
            <p className={`lg ${styles.copy}`}>
              We're not a bank—we're your advocate. Our job is to compare the market, 
              negotiate better terms, and guide you through every step. You get choice, 
              clarity, and service that's completely free to you.
            </p>
          </Copy>

          <div ref={imageCardRef} className={styles.imageCard}>
            <div className={styles.image}>
              <img src={image} alt={alt} />
            </div>
          </div>
        </div>

        <Copy>
          <ul ref={listRef} className={styles.list}>
            {OUTCOMES.map((item) => (
              <li key={item} className={styles.item}>
                <span className={`di-trigger ${styles.check}`} aria-hidden="true">
                  <CheckIcon size={28} texture="dither" animate />
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </Copy>
      </div>
    </section>
  );
}
