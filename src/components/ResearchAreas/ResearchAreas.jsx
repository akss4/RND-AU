"use client";

import styles from "./ResearchAreas.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CpuIcon,
  FlaskIcon,
  NetworkIcon,
  TensorIcon,
} from "@unlocalhosted/dither-icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
  {
    title: "Home Loans & First Home Buyers",
    label: "Home Loans",
    description:
      "Whether you're buying your first home or upgrading, we compare hundreds of home loan products to find competitive rates and features that fit your budget.",
    Icon: CpuIcon,
  },
  {
    title: "Refinancing & Investment Property",
    label: "Refinancing",
    description:
      "Lower your rate, unlock equity, or build your property portfolio. We help you refinance smarter and structure investment loans that grow your wealth.",
    Icon: NetworkIcon,
  },
  {
    title: "Asset Finance & Vehicle Loans",
    label: "Asset Finance",
    description:
      "From cars to commercial equipment, we secure asset finance and vehicle loans with flexible terms, helping you acquire what you need without upfront strain.",
    Icon: TensorIcon,
  },
  {
    title: "Business Loans & Commercial Finance",
    label: "Business Loans",
    description:
      "Fuel your business growth with tailored business loans, commercial property finance, and working capital solutions designed for Australian entrepreneurs.",
    Icon: FlaskIcon,
  },
];

export default function ResearchAreas() {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(
        container.current.querySelectorAll(`.${styles.area}`),
      );

      cards.forEach((card, index) => {
        if (index >= cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(card, {
              scale: 1 - progress * 0.25,
              rotation: (index % 2 === 0 ? 5 : -5) * progress,
              opacity: 1 - progress,
              filter: `blur(${progress * 8}px)`,
            });
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section className={styles.researchAreas} ref={container}>
      <div className={styles.bg} aria-hidden="true">
        <img src="/images/research/areas.jpg" alt="" />
      </div>

      <div className={styles.stack}>
        {CARDS.map(({ title, label, description, Icon }) => (
          <article key={title} className={styles.area}>
            <div className={styles.panel}>
              <div className={styles.main}>
                <h2 className={styles.title}>{title}</h2>
                <p className="lg">{description}</p>
              </div>

              <div className={styles.side}>
                <div className={`di-trigger ${styles.icon}`}>
                  <Icon size={160} texture="dither" animate />
                </div>
                <p className="mono sm">{label}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
