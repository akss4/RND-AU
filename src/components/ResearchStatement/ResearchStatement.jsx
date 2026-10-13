"use client";

import styles from "./ResearchStatement.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "@/components/Copy";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { label: "Lenders in network", value: "100+" },
  { label: "Loan products", value: "500+" },
  { label: "Average approval time", value: "48hrs" },
  { label: "Client satisfaction", value: "5★" },
];

export default function ResearchStatement({
  image = "/images/journal/article-1.jpg",
  alt = "Finance advisory and lending options",
}) {
  const sectionRef = useRef(null);
  const imageCardRef = useRef(null);

  useGSAP(
    () => {
      const card = imageCardRef.current;
      if (!card) return;

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
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section ref={sectionRef} className={styles.researchStatement}>
      <Copy variant="flicker">
        <SectionHeader bullet left="Our advantage" right="The numbers" />
      </Copy>
      <div className={`container ${styles.inner}`}>
        <div className={styles.cols}>
          <div className={styles.mainCol}>
            <Copy>
              <p className={`lg ${styles.statement}`}>
                We believe great finance is about choice and clarity. 
                That's why we compare hundreds of loan products across major banks, 
                credit unions, and specialist lenders to find your best match.
              </p>
            </Copy>

            <div ref={imageCardRef} className={styles.imageCard}>
              <div className={styles.image}>
                <img src={image} alt={alt} />
              </div>
            </div>
          </div>

          <div className={styles.aside}>
            <Copy>
              <p className={`lg ${styles.copy}`}>
                Our service covers home loans, refinancing, asset finance, and business 
                lending. We handle the complexity, negotiate on your behalf, and ensure 
                you understand every step from application to settlement.
              </p>
            </Copy>

            <div className={styles.stats}>
              {STATS.map(({ label, value }) => (
                <div key={label} className={styles.stat}>
                  <Copy variant="flicker">
                    <p className="mono sm">{label}</p>
                  </Copy>
                  <Copy type="chars">
                    <h2>{value}</h2>
                  </Copy>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
