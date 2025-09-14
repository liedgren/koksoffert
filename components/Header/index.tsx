"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HeaderProps, NavigationItem } from "./types";
import styles from "./Header.module.css";

const navigationItems: NavigationItem[] = [
  { label: "Om oss", href: "/om-oss" },
  { label: "Så fungerar det", href: "/sa-fungerar-det" },
  { label: "Nyheter", href: "/artiklar" },
];

export default function Header({
  className = "",
  showLogo = true,
  showNavigation = true,
  showCtaButton = true,
  onCtaClick,
}: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isHomePage) {
      // If on homepage, dispatch custom event for Hero component to listen to
      window.dispatchEvent(new CustomEvent("headerCtaClick"));
    } else {
      // If on other pages, redirect to homepage with form expansion trigger
      window.location.href = "/?expandForm=true";
    }
  };

  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <div className={styles.container}>
          {/* Logo */}
          {showLogo && (
            <div className={styles.logo}>
              <Link href="/" className={styles.logoLink}>
                <Image
                  src="/images/logos/logo.svg"
                  alt="Koksoffert Logo"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>
          )}

          {/* Navigation */}
          {showNavigation && (
            <nav className={styles.navigation}>
              <ul className={styles.navList}>
                {navigationItems.map((item) => (
                  <li key={item.href} className={styles.navItem}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${
                        item.isActive ? styles.navLinkActive : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* CTA Button */}
          {showCtaButton && (
            <div className={styles.cta}>
              <button onClick={handleCtaClick} className={styles.ctaButton}>
                Jämför din offert
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
