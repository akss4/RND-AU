"use client";

import styles from "./ProcessSteps.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowRight } from "react-icons/fi";

import Copy from "@/components/Copy";
import SectionFooter from "@/components/SectionFooter";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
  { index: "01", copy: "Tell us your goals and financial situation." },
  { index: "02", copy: "We compare hundreds of loans and negotiate rates." },
  { index: "03", copy: "We manage your application and documentation." },
];

const SCALE_STEP = 0.1;
const SHIFT_VMIN = -2;

export default function ProcessSteps() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = gsap.utils.toArray(
        section.querySelectorAll(`.${styles.step}`),
      );
      const faces = gsap.utils.toArray(
        section.querySelectorAll(`.${styles.face}`),
      );
      const last = cards[cards.length - 1];
      const stick = () => getComputedStyle(cards[0]).top;

      if (faces.length) {
        gsap.set(faces, { y: 300, opacity: 0 });
        gsap.to(faces, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      cards.forEach((card, index) => {
        const steps = cards.length - 1 - index;
        if (steps < 1) return;

        const shift = () =>
          steps *
          SHIFT_VMIN *
          (Math.min(window.innerWidth, window.innerHeight) / 100);

        gsap.to(card, {
          scale: 1 - SCALE_STEP * steps,
          y: shift,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: () => `top ${stick()}`,
            endTrigger: last,
            end: () => `top ${stick()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(card.querySelector("p"), {
          color: "#9a9892",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: () => `top ${stick()}`,
            endTrigger: last,
            end: () => `top ${stick()}`,
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className={styles.processSteps} ref={sectionRef}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.list}>
          {CARDS.map(({ index, copy }, i) => (
            <article
              key={index}
              className={styles.step}
              style={{ zIndex: i + 1 }}
            >
              <div className={styles.face}>
                <p className="lg">{copy}</p>
                <h6 className={styles.index}>{index}</h6>
              </div>
            </article>
          ))}
          <a
            href="/partnerships"
            className={`${styles.step} ${styles.cta}`}
            style={{ zIndex: CARDS.length + 1 }}
          >
            <div className={styles.face}>
              <p className="lg">Your loan settles and you move forward.</p>
              <span className={styles.arrow} aria-hidden="true">
                <FiArrowRight />
              </span>
            </div>
          </a>
        </div>
        <Copy start="top 75%" trigger={`.${styles.processSteps}`}>
          <h5 className={styles.headline}>
            From first call to final settlement, in four straightforward steps.
          </h5>
        </Copy>
      </div>

      <Copy variant="flicker">
        <SectionFooter
          bullet
          left="Consultation to settlement"
          right="Your complete journey"
        />
      </Copy>
    </section>
  );
}
