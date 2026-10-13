"use client";

import styles from "./BankLogosMarquee.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BankLogosMarquee() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      let active = true;

      const setup = async () => {
        try {
          await document.fonts.ready;
        } catch {
          // Ignore font loading errors
        }
        if (!active || !rootRef.current) return;

        root.classList.add(styles.ready);

        ScrollTrigger.refresh();
      };

      setup();

      return () => {
        active = false;
      };
    },
    { scope: rootRef, dependencies: [] },
  );

  // Import all logo images
  const logos = [
    "/images/logos/1.png",
    "/images/logos/2.png",
    "/images/logos/3.png",
    "/images/logos/4.png",
    "/images/logos/5.png",
    "/images/logos/6.png",
    "/images/logos/7.png",
    "/images/logos/8.png",
    "/images/logos/9.png",
    "/images/logos/10.png",
    "/images/logos/11.png",
    "/images/logos/12.png",
    "/images/logos/13.png",
    "/images/logos/14.png",
    "/images/logos/15.png",
    "/images/logos/16.png",
    "/images/logos/17.png",
    "/images/logos/18.png",
    "/images/logos/19.png",
  ];

  return (
    <section ref={rootRef} className={styles.marquee} aria-label="Bank logos carousel">
      <div className={`container ${styles.marqueeInner}`}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.line} aria-hidden={copy === 1 ? true : undefined}>
              {logos.map((logo, index) => (
                <img
                  key={`${logo}-${copy}-${index}`}
                  src={logo}
                  alt="RND Financials logo"
                  className={styles.logo}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
