import styles from "./PartnersSection.module.css";

import Copy from "@/components/Copy";
import SectionHeader from "@/components/SectionHeader";
import PartnerList from "@/components/PartnerList";
import SectionFooter from "@/components/SectionFooter";

export default function PartnersSection() {
  return (
    <section className={styles.partnersSection}>
      <Copy variant="flicker">
        <SectionHeader bullet left="The partners" right="On real buildings" />
      </Copy>
      <div className={`container ${styles.cols}`}>
        <div className={styles.spacer} />
        <div className={styles.copy}>
          <Copy>
            <h2>
              Owners, architects, and fabricators. Partners who take the data off
              the bench and onto a real building.
            </h2>
          </Copy>
        </div>
      </div>
      <PartnerList />
      <SectionFooter bullet left="Active partners" right="Eighteen firms" />
    </section>
  );
}
