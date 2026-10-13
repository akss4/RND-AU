"use client";

import styles from "./BanksSection.module.css";

import BankLogosMarquee from "@/components/BankLogosMarquee";
import SectionHeader from "@/components/SectionHeader";

export default function BanksSection() {
  return (
    <section className={styles.banksSection}>
      <SectionHeader
        variant="v1"
        bullet
        left="our banks"
        className={styles.sectionHeader}
      />
      <BankLogosMarquee />
    </section>
  );
}