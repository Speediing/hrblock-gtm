import { BrandLockup } from "@/components/brand-lockup";
import type { LeaveBehindContent } from "@/content/types";

import styles from "./leave-behind.module.css";

export function SiteFooter(props: {
  readonly brand: LeaveBehindContent["brand"];
  readonly contact: LeaveBehindContent["contact"];
}) {
  const { brand, contact } = props;

  return (
    <footer className={styles.footer}>
      <div className={`page-shell ${styles.footerInner}`}>
        <div>
          <p className={styles.footerPrompt}>{contact.prompt}</p>
          <p className={styles.footerNote}>{contact.note}</p>
        </div>
        <address className={styles.contact}>
          <strong>{contact.name}</strong>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </address>
        <BrandLockup brand={brand} invert />
      </div>
    </footer>
  );
}