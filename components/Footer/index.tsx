"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          {/* Column 1: Logo and Tagline */}
          <div className={styles.logoColumn}>
            <div className={styles.logo}>
              <img src="/images/logos/logo.svg" alt="Koksoffert" />
            </div>
            <p className={styles.tagline}>
              Få bättre priser på din köksrenovering
            </p>
          </div>

          {/* Column 2: Support */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Support</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:info@koksoffert.se" className={styles.link}>
                  info@koksoffert.se
                </a>
              </li>
              <li>
                <a href="tel:0812345678" className={styles.link}>
                  08 - 123 456 78
                </a>
              </li>
              <li className={styles.hours}>Vardagar 9-17</li>
            </ul>
          </div>

          {/* Column 3: Företag */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Företag</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/om-oss" className={styles.link}>
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/integritetspolicy" className={styles.link}>
                  Integritetspolicy
                </Link>
              </li>
              <li>
                <Link href="/villkor" className={styles.link}>
                  Villkor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Köksoffert.se
          </p>
        </div>
      </div>
    </footer>
  );
}
