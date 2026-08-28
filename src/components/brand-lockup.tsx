import Image from "next/image";

import type { LeaveBehindContent } from "@/content/types";

import styles from "./brand-lockup.module.css";

const PARTNER_HEIGHT = 10;
const PARTNER_WIDTH = Math.round((1294 / 158) * PARTNER_HEIGHT);

export function BrandLockup(props: {
  readonly brand: LeaveBehindContent["brand"];
  readonly invert?: boolean;
  readonly priority?: boolean;
}) {
  const { brand, invert = false, priority = false } = props;
  const markHeight = brand.wordmark.renderedHeightPx;

  return (
    <div
      className={`${styles.lockup} ${invert ? styles.invert : ""}`}
      aria-label={brand.lockupLabel}
    >
      {brand.wordmark.available ? (
        <Image
          src={brand.wordmark.src}
          alt={brand.wordmark.alt}
          height={markHeight}
          width={Math.round(markHeight * 5)}
          className={styles.customer}
          priority={priority}
          unoptimized
        />
      ) : (
        <span className={styles.customerName}>{brand.customerName}</span>
      )}
      <span className={styles.times} aria-hidden="true">
        ×
      </span>
      <Image
        src={brand.partnerMarkSrc}
        alt=""
        height={PARTNER_HEIGHT}
        width={PARTNER_WIDTH}
        className={styles.partner}
        priority={priority}
        unoptimized
      />
    </div>
  );
}