"use client";

import styles from "./FAQ.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "@/components/Copy";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ITEMS = [
  {
    question: "What does Tessera Lab work on?",
    answer: [
      "We work across data, machine learning, and applied AI, with a focus on problems that require more than an off-the-shelf solution.",
      "That can mean developing new models, investigating unfamiliar datasets, building intelligent systems, or testing a research idea in a real environment.",
      "We are interested in difficult questions where the answer is not obvious at the outset.",
    ],
  },

  {
    question: "Do you work with proprietary or private data?",
    answer: [
      "Yes. We work with both public datasets and private data provided by research or industry partners.",
      "The approach depends on the problem, the data available, and the constraints around how it can be used.",
      "Data access, governance, privacy, and security are considered as part of the research from the beginning.",
    ],
  },

  {
    question: "What does a research engagement look like?",
    answer: [
      "We start with a question and define what would make an investigation useful.",
      "From there, we move through data, experimentation, modelling, and evaluation, adapting the approach as we learn more.",
      "The outcome might be a validated model, a working prototype, a new method, or evidence that a particular direction is not worth pursuing.",
    ],
  },

  {
    question: "How do we start working with Tessera?",
    answer: [
      "Bring us a problem, a research question, or a system you want to understand better.",
      "A clear objective is useful, but a finished specification is not required. We can help define the scope and identify what should be tested first.",
      "If there is a meaningful question to investigate, we can start there.",
    ],
  },
];

export default function FAQ() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const messages = rootRef.current.querySelectorAll(`.${styles.message}`);

      messages.forEach((message) => {
        const row = message.parentElement;
        const typingIndicator = message.querySelector(`.${styles.typing}`);
        const messageCopy = message.querySelectorAll(`.${styles.content} p`);

        const expandedWidth = message.offsetWidth;
        message.style.width = `${expandedWidth}px`;
        const expandedHeight = message.offsetHeight;
        row.style.minHeight = `${expandedHeight}px`;

        gsap.set(message, {
          width: 64,
          height: 64,
          borderRadius: 0,
          padding: 0,
          scale: 0,
        });

        let collapseWhenDone = false;

        const enterTimeline = gsap.timeline({ paused: true });
        enterTimeline.to(message, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        const expandTimeline = gsap.timeline({
          paused: true,
          onReverseComplete: () => {
            if (collapseWhenDone) {
              collapseWhenDone = false;
              enterTimeline.reverse();
            }
          },
        });

        expandTimeline
          .to(typingIndicator, {
            autoAlpha: 0,
            duration: 0.2,
          })
          .to(message, {
            width: expandedWidth,
            paddingLeft: "2rem",
            paddingRight: "2rem",
            duration: 0.4,
            ease: "power3.inOut",
          })
          .to(
            message,
            {
              height: expandedHeight,
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              duration: 0.4,
              ease: "power3.inOut",
            },
            "-=0.2",
          )
          .to(
            messageCopy,
            {
              opacity: 1,
              duration: 0.3,
              stagger: 0.05,
            },
            "-=0.25",
          );

        ScrollTrigger.create({
          trigger: message,
          start: "top 85%",
          onEnter: () => {
            collapseWhenDone = false;
            enterTimeline.play();
          },
          onLeaveBack: () => {
            if (expandTimeline.progress() > 0) {
              collapseWhenDone = true;
            } else {
              enterTimeline.reverse();
            }
          },
        });

        ScrollTrigger.create({
          trigger: message,
          start: "top 75%",
          onEnter: () => expandTimeline.play(),
          onLeaveBack: () => expandTimeline.reverse(),
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section className={styles.faq} ref={rootRef}>
      <Copy variant="flicker">
        <SectionHeader bullet left="FAQ / 01" right="Lab Notes" />
      </Copy>

      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <Copy>
            <h2>Your questions answered</h2>
          </Copy>
        </div>

        <div className={styles.list}>
          {ITEMS.map((item) => (
            <div key={item.question} className={styles.item}>
              <div className={`${styles.row} ${styles.questionSlot}`}>
                <div className={`${styles.message} ${styles.question}`}>
                  <div className={styles.typing} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.content}>
                    <p>{item.question}</p>
                  </div>
                </div>
              </div>
              <div className={`${styles.row} ${styles.answerSlot}`}>
                <div className={`${styles.message} ${styles.answer}`}>
                  <div className={styles.typing} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.content}>
                    {item.answer.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
