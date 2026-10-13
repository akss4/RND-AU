"use client";

import styles from "./BusinessLoans.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowDown } from "react-icons/fi";
import {
  TargetIcon,
  WorkspaceIcon,
  ChartIcon,
  SlidersIcon,
} from "@unlocalhosted/dither-icons";

import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import Copy from "@/components/Copy";
import Button from "@/components/Button";
import {
  BUSINESS_LOANS_CATEGORY,
  BUSINESS_LOAN_PRODUCTS,
} from "@/data/businessLoansData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS = {
  TargetIcon,
  WorkspaceIcon,
  ChartIcon,
  SlidersIcon,
};

export default function BusinessLoans() {
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
        title={BUSINESS_LOANS_CATEGORY.title}
        subtitle={BUSINESS_LOANS_CATEGORY.subtitle}
        description={BUSINESS_LOANS_CATEGORY.description}
        icon={BUSINESS_LOANS_CATEGORY.icon}
      />

      {/* Hero Quick Consultation CTA Bar */}
      <div className={styles.heroCtaSection}>
        <div className={`container ${styles.heroCtaInner}`}>
          <div className={styles.heroCtaText}>
            <p className="mono sm">Commercial Business Finance</p>
            <p>
              We assist eligible businesses, partnerships, and sole traders across Australia in exploring business lending options suited to working capital, equipment, expansion, and operational growth.
            </p>
          </div>
          <div className={styles.heroCtaButton}>
            <Button variant="primary" href="/contact?service=Business+Loans">
              Discuss Business Finance
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRODUCTS OVERVIEW (QUICK JUMP CARDS) */}
      <section className={styles.overviewSection}>
        <div className={styles.overviewBg} aria-hidden="true">
          <img src="/images/loans/business-banner.jpg" alt="" />
        </div>

        <Copy variant="flicker">
          <SectionHeader
            bullet
            left="01 / Category Overview"
            right="3 Business Finance Solutions"
          />
        </Copy>

        <div className={`container ${styles.overviewContent}`}>
          <div className={styles.overviewHeader}>
            <Copy>
              <h2 className={styles.overviewTitle}>
                Financing structures tailored to your commercial objectives.
              </h2>
            </Copy>
          </div>

          <div className={styles.overviewGrid}>
            {BUSINESS_LOAN_PRODUCTS.map((prod) => {
              const IconComponent = ICONS[prod.icon] || TargetIcon;
              return (
                <div key={prod.slug} className={styles.overviewCard}>
                  <div>
                    <div className={styles.cardTop}>
                      <span className={`mono sm ${styles.cardIndex}`}>
                        {prod.index} / 03
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

      {/* SECTION 3: DETAILED PRODUCT SECTIONS (ALL 3 PRODUCTS) */}
      {BUSINESS_LOAN_PRODUCTS.map((prod) => (
        <section
          key={prod.slug}
          id={prod.slug}
          className={styles.detailSection}
        >
          <Copy variant="flicker">
            <SectionHeader
              bullet
              left={`${prod.index} / Business Loans`}
              right="RND Financials"
            />
          </Copy>

          <div className={`container ${styles.detailGrid}`}>
            {/* Sticky Sidebar with Product Title and Action */}
            <aside className={styles.detailSidebar}>
              <div className={styles.detailHeadingBlock}>
                <span className={`mono sm ${styles.detailIndex}`}>
                  Product {prod.index} of 03
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
                    src={prod.image || "/images/loans/latent-router.jpg"}
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
              Let&apos;s discuss your business finance requirements.
            </h2>
          </Copy>

          <p className={styles.finalCtaText}>
            Explore available business finance options with the RND Financials team. We assist eligible companies, partnerships, and sole traders across Australian lending structures, documentation, and credit assessments.
          </p>

          <div className={styles.finalCtaButtonWrap}>
            <Button variant="accent" href="/contact?service=Business+Loans">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
