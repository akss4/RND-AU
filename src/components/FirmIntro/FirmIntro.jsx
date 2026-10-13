import styles from "./FirmIntro.module.css";

import Copy from "@/components/Copy";

export default function FirmIntro() {
  return (
    <section className={styles.firmIntro}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.block}>
          <Copy animateOnScroll={false} delay="1.25">
            <h1 className={styles.heading}>
              We are a Melbourne-based mortgage brokerage. We compare hundreds of loans.
            </h1>
          </Copy>
        </div>

        <div className={styles.block}>
          <Copy>
            <h1 className={styles.heading}>
              We are a Melbourne-based mortgage brokerage. We compare hundreds of loans, 
              negotiate better rates, and guide you from application to settlement with 
              complete transparency.
            </h1>
          </Copy>
        </div>
      </div>
    </section>
  );
}
