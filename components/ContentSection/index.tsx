import Container from "@/components/Container";
import Button from "@/components/Button";
import styles from "./ContentSection.module.css";

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "light" | "dark";
}

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface ProcessStepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

interface BenefitItemProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}

export function ProcessStep({ number, title, children }: ProcessStepProps) {
  return (
    <div className={styles.processStep}>
      <div className={styles.stepNumber}>{number}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDescription}>{children}</p>
    </div>
  );
}

export function BenefitItem({ title, children }: BenefitItemProps) {
  return (
    <div className={styles.benefitItem}>
      <h3 className={styles.benefitTitle}>{title}</h3>
      <p className={styles.benefitDescription}>{children}</p>
    </div>
  );
}

export default function ContentSection({
  children,
  className = "",
  background = "white",
}: ContentSectionProps) {
  return (
    <div
      className={`${styles.contentSection} ${styles[background]} ${className}`}
    >
      <Container>{children}</Container>
    </div>
  );
}
