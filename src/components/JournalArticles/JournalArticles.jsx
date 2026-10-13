"use client";

import styles from "./JournalArticles.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "@/components/Copy";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ITEMS = [
  {
    title: "The Edinburgh lab that breaks a model before it trusts it",
    image: "/images/journal/article-1.jpg",
  },
  {
    title: "Why Tessera spends more time on evaluation than training",
    image: "/images/journal/article-2.jpg",
  },
  {
    title: "A research group that will not ship what it cannot explain",
    image: "/images/journal/article-3.jpg",
  },
  {
    title: "What one lab found when the benchmark was far too clean",
    image: "/images/journal/article-4.jpg",
  },
  {
    title: "Measuring alignment after a model enters production use",
    image: "/images/journal/article-5.jpg",
  },
];

export default function JournalArticles() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll(`.${styles.article}`);
      if (!cards.length) return;

      gsap.set(cards, { y: 300, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section ref={sectionRef} className={styles.journalArticles}>
      <Copy variant="flicker">
        <SectionHeader bullet left="Features / 01" right="In the press" />
      </Copy>

      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <Copy>
            <h2>Selected coverage</h2>
          </Copy>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {ITEMS.map(({ title, image }) => (
            <article key={title} className={styles.article}>
              <div className={styles.image}>
                <img src={image} alt="" />
              </div>
              <h3 className={styles.title}>{title}</h3>
              <Button href="#" className={styles.cta}>
                Read the piece
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
