"use client";

import styles from "./CommercialLoans.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowDown } from "react-icons/fi";
import {
  WorkspaceIcon,
  ChartIcon,
  SlidersIcon,
  LayersIcon,
} from "@unlocalhosted/dither-icons";

import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import Copy from "@/components/Copy";
import Button from "@/components/Button";
import {
  COMMERCIAL_LOANS_CATEGORY,
  COMMERCIAL_LOAN_PRODUCTS,
} from "@/data/commercialLoansData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS = {
  WorkspaceIcon,
  ChartIcon,
  SlidersIcon,
  LayersIcon,
};

export default function CommercialLoans() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(`.${styles.imageCard}`);
      cards.forEach((card) => {
        gsap.set(card, { y: 60, opacity: 0 });
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: pageRef, dependencies: [] }
  );

  return (
    <div ref={pageRef} className={styles.pageWrapper}>
      {/* SECTION 1: HERO */}
      <PageHeader
        title={COMMERCIAL_LOANS_CATEGORY.title}
        subtitle={COMMERCIAL_LOANS_CATEGORY.subtitle}
        description={COMMERCIAL_LOANS_CATEGORY.description}
        icon={COMMERCIAL_LOANS_CATEGORY.icon}
      />

      {/* Hero Quick Consultation CTA Bar */}
      <div className={styles.heroCtaSection}>
        <div className={`container ${styles.heroCtaInner}`}>
          <div className={styles.heroCtaText}>
            <p className="mono sm">Commercial Property Lending</p>
            <p>
              We assist eligible businesses and investors across Australia in exploring commercial property financing arrangements tailored to property types, financial performance, and lender requirements.
            </p>
          </div>
          <div className={styles.heroCtaButton}>
            <Button variant="primary" href="/contact?service=Commercial+Loans">
              Discuss Commercial Finance
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRODUCTS OVERVIEW (QUICK JUMP CARDS) */}
      <section className={styles.overviewSection}>
        <div className={styles.overviewBg} aria-hidden="true">
          <img src="/images/research/areas.jpg" alt="" />
        </div>

        <Copy variant="flicker">
          <SectionHeader
            bullet
            left="01 / Category Overview"
            right="4 Commercial Lending Solutions"
          />
        </Copy>

        <div className={`container ${styles.overviewContent}`}>
          <div className={styles.overviewHeader}>
            <Copy>
              <h2 className={styles.overviewTitle}>
                Financing solutions structured for commercial property transactions.
              </h2>
            </Copy>
          </div>

          <div className={styles.overviewGrid}>
            {COMMERCIAL_LOAN_PRODUCTS.map((prod) => {
              const IconComponent = ICONS[prod.icon] || WorkspaceIcon;
              return (
                <div key={prod.slug} className={styles.overviewCard}>
                  <div>
                    <div className={styles.cardTop}>
                      <span className={`mono sm ${styles.cardIndex}`}>
                        {prod.index} / 04
                      </span>
                      <div className={`di-trigger ${styles.cardIcon}`}>
                        <IconComponent size={32} texture="dither" animate />
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{prod.name}</h3>
                      <p className={styles.cardSummary}>{prod.summary}</p>
                    </div>
                  </div>

                  <a href={`#${prod.slug}`} className={styles.cardAction}>
                    <span>Read Details</span>
                    <FiArrowDown />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: DETAILED PRODUCT SECTIONS (ALL 4 PRODUCTS) */}
      {COMMERCIAL_LOAN_PRODUCTS.map((prod) => (
        <section
          key={prod.slug}
          id={prod.slug}
          className={styles.detailSection}
        >
          <Copy variant="flicker">
            <SectionHeader
              bullet
              left={`${prod.index} / Commercial Loans`}
              right="RND Financials"
            />
          </Copy>

          <div className={`container ${styles.detailGrid}`}>
            {/* Sticky Sidebar with Product Title and Action */}
            <aside className={styles.detailSidebar}>
              <div className={styles.detailHeadingBlock}>
                <span className={`mono sm ${styles.detailIndex}`}>
                  Product {prod.index} of 04
                </span>
                <Copy>
                  <h2 className={styles.detailTitle}>{prod.name}</h2>
                </Copy>
              </div>

              <div className={styles.detailCta}>
                <Button
                  variant="primary"
                  href={`/contact?service=${encodeURIComponent(prod.name)}`}
                >
                  Enquire About This Loan
                </Button>
              </div>

              {/* Negative Space Fill Image Card */}
              <div className={styles.imageCard}>
                <div className={styles.image}>
                  <img
                    src={prod.image || "/images/work/grounded-decoder.jpg"}
                    alt={prod.name}
                  />
                </div>
              </div>
            </aside>

            {/* Main Content with Full Verbatim Paragraphs & Risk Warning */}
            <div className={styles.detailContent}>
              <div className={styles.paragraphGroup}>
                {prod.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {prod.warning ? (
                <div className={styles.warningBox}>
                  <div className={styles.warningHeader}>
                    <span className={styles.warningBullet} aria-hidden="true" />
                    <p className="mono sm">Important Considerations &amp; Risk Notice</p>
                  </div>
                  <p className={styles.warningText}>{prod.warning}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* SECTION 4: FINAL CONSULTATION CTA */}
      <section className={styles.finalCtaSection}>
        <div className={`container ${styles.finalCtaInner}`}>
          <Copy variant="flicker">
            <p className="mono sm" style={{ color: "var(--base-accent)" }}>
              Take The Next Step
            </p>
          </Copy>

          <Copy>
            <h2 className={styles.finalCtaTitle}>
              Let&apos;s discuss your commercial finance requirements.
            </h2>
          </Copy>

          <p className={styles.finalCtaText}>
            Explore available commercial finance options with the RND Financials team. We assist eligible businesses and investors across loan structures, lender documentation, and credit assessments.
          </p>

          <div className={styles.finalCtaButtonWrap}>
            <Button variant="accent" href="/contact?service=Commercial+Loans">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
