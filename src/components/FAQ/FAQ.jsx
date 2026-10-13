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
    question: "What does RND Financials do?",
    answer: [
      "We are an Australian mortgage brokerage based in Melbourne, helping you navigate home loans, refinancing, asset finance, and commercial lending.",
      "We compare hundreds of loan products across major banks and specialist lenders to find the right rate and structure tailored to your goals.",
      "From initial borrowing capacity calculation to final loan settlement, we manage the entire process on your behalf.",
    ],
  },

  {
    question: "Are your mortgage broking services free?",
    answer: [
      "Yes. For standard residential home loans and refinancing, our broking service is free to you as a borrower.",
      "We are paid a commission by the lender upon settlement of your loan. We disclose all lender fees and commission structures with complete transparency upfront.",
      "Our duty is to act in your best interests under Best Interests Duty (BID), ensuring you get the most suitable loan solution.",
    ],
  },

  {
    question: "What does a loan application process look like?",
    answer: [
      "We begin with a free consultation to understand your financial position, borrowing capacity, and property aspirations.",
      "Next, we shortlist suitable loan options from over 100+ Australian lenders and submit your application with all required documentation.",
      "We liaise directly with the bank's assessors to secure your pre-approval, formal approval, and final settlement smoothly.",
    ],
  },

  {
    question: "How do we start working with RND Financials?",
    answer: [
      "Simply reach out to us via our contact form or book a free discovery call.",
      "You don't need all your paperwork ready for the first chat — we will guide you on exactly what documents are needed.",
      "Whether you are a first home buyer, upgrading, investing, or refinancing, we are ready to assist you.",
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
        <SectionHeader bullet left="FAQ / 01" right="Client Guidance" />
      </Copy>

      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <Copy>
            <h2>Your questions answered</h2>
          </Copy>
        </div>

        <div className={styles.list}>
          {ITEMS.map((item, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.message}>
                <div className={styles.typing}>
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                </div>
                <div className={styles.content}>
                  <p className="mono sm">{item.question}</p>
                  {item.answer.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
