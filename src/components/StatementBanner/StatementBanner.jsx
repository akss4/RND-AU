import styles from "./StatementBanner.module.css";

import { Fragment } from "react";

import Copy from "@/components/Copy";

function copyLines(copy) {
  if (copy == null || copy === "") return [];
  if (Array.isArray(copy)) return copy;
  return String(copy).split("\n");
}

function BannerCopy({ copy, className }) {
  const lines = copyLines(copy);
  if (!lines.length) return null;
  return (
    <Copy>
      <h6
        className={`${className}${lines.length > 1 ? ` ${styles.multiline}` : ""}`}
      >
        {lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 ? <br /> : null}
            {line}
          </Fragment>
        ))}
      </h6>
    </Copy>
  );
}

export default function StatementBanner({
  showContent = true,
  src = "/images/home/statement.jpg",
  copyTopLeft = "The right loan shouldn't cost you time or clarity.",
  copyBottomRight = "We make finance simple, transparent, and built around you.",
}) {
  return (
    <section className={styles.statementBanner}>
      <div className={styles.bg}>
        <img src={src} alt="" />
      </div>
      {showContent ? (
        <div className={`container ${styles.content}`}>
          <BannerCopy copy={copyTopLeft} className={styles.title} />
          <BannerCopy
            copy={copyBottomRight}
            className={styles.copy}
          />
        </div>
      ) : null}
    </section>
  );
}
