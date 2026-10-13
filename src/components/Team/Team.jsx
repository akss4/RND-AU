"use client";

import styles from "./Team.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "@/components/Copy";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GRID = [
  [0, null, 1, null],
  [null, 2, null, null],
  [3, null, null, 4],
  [null, 5, 6, null],
  [7, null, null, 8],
  [null, null, 9, null],
  [null, 10, null, 11],
  [12, null, 13, null],
  [null, 14, null, null],
  [15, null, null, 16],
];

const ORIGINS = [
  "right",
  "left",
  "left",
  "right",
  "left",
  "left",
  "right",
  "left",
  "left",
  "left",
  "left",
  "left",
  "right",
  "left",
  "left",
  "right",
  "left",
];

export default function Team() {
  const container = useRef(null);

  useGSAP(
    () => {
      const section = container.current;
      const images = section.querySelectorAll(`.${styles.img}`);
      const rows = section.querySelectorAll(`.${styles.row}`);

      const mm = gsap.matchMedia();

      mm.add("(max-width: 1000px)", () => {
        gsap.set(images, { scale: 1, force3D: true });
      });

      mm.add("(min-width: 1001px)", () => {
        gsap.set(images, { scale: 0, force3D: true });

        rows.forEach((row) => {
          const rowImages = row.querySelectorAll(`.${styles.img}`);
          if (!rowImages.length) return;

          ScrollTrigger.create({
            trigger: row,
            start: "top bottom",
            end: "bottom bottom-=10%",
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              if (!self.isActive) return;
              const eased = Math.min(1, self.progress * 1.2);
              const scale = gsap.utils.interpolate(0, 1, eased);
              gsap.set(rowImages, { scale, force3D: true });
              if (self.progress > 0.95) {
                gsap.set(rowImages, { scale: 1, force3D: true });
              }
            },
            onLeave() {
              gsap.set(rowImages, { scale: 1, force3D: true });
            },
          });

          const scaleOut = ScrollTrigger.create({
            trigger: row,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter() {
              gsap.set(rowImages, { scale: 1, force3D: true });
            },
            onUpdate(self) {
              if (self.isActive) {
                const scale = gsap.utils.interpolate(1, 0, self.progress);
                rowImages.forEach((img) => {
                  gsap.set(img, {
                    scale,
                    force3D: true,
                    clearProps: self.progress === 1 ? "scale" : "",
                  });
                });
              } else if (self.scroll() < self.start) {
                gsap.set(rowImages, { scale: 1, force3D: true });
              }
            },
          });

          ScrollTrigger.create({
            trigger: row,
            start: "bottom bottom",
            end: "top top",
            onEnter() {
              if (scaleOut.progress === 0) {
                gsap.set(rowImages, { scale: 1, force3D: true });
              }
            },
            onLeave() {
              if (scaleOut.progress === 0) {
                gsap.set(rowImages, { scale: 1, force3D: true });
              }
            },
            onEnterBack() {
              if (scaleOut.progress === 0) {
                gsap.set(rowImages, { scale: 1, force3D: true });
              }
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section className={styles.team} ref={container}>
      <Copy variant="flicker">
        <SectionHeader
          bullet
          left="Our team"
          right="Mortgage brokers and specialists"
        />
      </Copy>
      {GRID.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((imageIndex, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={styles.col}>
              {imageIndex !== null ? (
                <div
                  className={styles.img}
                  data-origin={ORIGINS[imageIndex]}
                >
                  <img
                    src={`/images/firm/team/member-${String(imageIndex + 1).padStart(2, "0")}.jpg`}
                    alt=""
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
