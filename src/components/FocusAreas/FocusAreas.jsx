"use client";

import styles from "./FocusAreas.module.css";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import {
  NetworkIcon,
  BoltIcon,
  ChartIcon,
} from "@unlocalhosted/dither-icons";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const ICON_LOOP_MS = 1800;

const CLIP_START = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
const CLIP_END = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const CARDS = [
  {
    index: "01",
    title: "Access to 100+ Lenders",
    copy: "We connect you with major banks, credit unions, and specialist lenders across Australia, comparing rates and features to secure your best deal.",
    Icon: NetworkIcon,
    cardClass: styles.accent,
  },
  {
    index: "02",
    title: "Fast, Smooth Approvals",
    copy: "We handle your paperwork, liaise with lenders, and streamline the application process so you get pre-approval faster and settle with confidence.",
    Icon: BoltIcon,
    cardClass: styles.dark,
  },
  {
    index: "03",
    title: "Transparent, No Hidden Fees",
    copy: "Our service is free to you. We're paid by lenders after settlement and disclose everything upfront, so you make decisions with complete clarity.",
    Icon: ChartIcon,
    cardClass: styles.light,
  },
];

export default function FocusAreas() {
  const rootRef = useRef(null);
  const [replayKey, setReplayKey] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setReplayKey((key) => key + 1);
    }, ICON_LOOP_MS);

    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const cards = gsap.utils.toArray(`.${styles.area}`);
      if (!cards.length) return;

      let active = true;
      const splits = [];
      let tween = null;

      const setup = async () => {
        try {
          await document.fonts.ready;
        } catch {

        }
        if (!active || !rootRef.current) return;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
        tween = tl;

        cards.forEach((card, index) => {
          const icon = card.querySelector(`.${styles.icon}`);
          const texts = card.querySelectorAll("p");
          const cardSplits = gsap.utils.toArray(texts).map((element) =>
            SplitText.create(element, {
              type: "lines",
              mask: "lines",
              linesClass: styles.line,
              lineThreshold: 0.1,
            }),
          );
          splits.push(...cardSplits);
          const lines = cardSplits.flatMap((split) => split.lines ?? []);

          gsap.set(card, { clipPath: CLIP_START });
          if (icon) gsap.set(icon, { scale: 0, transformOrigin: "center", force3D: false });
          if (lines.length) gsap.set(lines, { yPercent: 110 });

          const at = index * 0.15;
          tl.to(card, { clipPath: CLIP_END, duration: 0.9 }, at);
          if (icon) {
            tl.to(
              icon,
              {
                scale: 1,
                duration: 0.6,
                force3D: false,
                onComplete: () => gsap.set(icon, { clearProps: "transform" }),
              },
              at + 0.15,
            );
          }
          if (lines.length) {
            tl.to(
              lines,
              { yPercent: 0, duration: 0.75, stagger: 0.08 },
              at + 0.2,
            );
          }
        });

        ScrollTrigger.refresh();
      };

      setup();

      return () => {
        active = false;
        tween?.kill();
        splits.forEach((split) => split.revert());
      };
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <section ref={rootRef} className={styles.focusAreas}>
      <div className={`container ${styles.inner}`}>
        {CARDS.map(({ index, title, copy, Icon, cardClass }) => (
          <div key={index} className={`${styles.area} ${cardClass}`}>
            <div className={styles.top}>
              <div className={`di-trigger ${styles.icon}`}>
                <Icon
                  size={80}
                  texture="dither"
                  animate
                  replayKey={replayKey}
                />
              </div>
              <p className="mono sm">{index}</p>
            </div>
            <div className={styles.copy}>
              <p className="lg">{title}</p>
              <p>{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
