import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import ProcessSteps from "@/components/ProcessSteps";
import ProjectShowcase from "@/components/ProjectShowcase";
import PartnershipInfo from "@/components/PartnershipInfo";
import styles from "@/styles/page-layout.module.css";

export const metadata: Metadata = {
  title: "Köksoffert.se - vägen till ett billigare kök.",
  description: "Vi jämför och sänker priset på ditt kök.",
};

export default async function HomePage() {
  return (
    <main className={styles.section}>
      <Hero
        title="Ge oss 1 minut - få 10 000-tals kronor tillbaka "
        subtitle="Ladda upp din befintliga köksoffert och svara på några snabba frågor. Sedan har du ett nytt fantastiskt pris inom 7 dagar.

."
      />

      <section className={styles.section}>
        <Brands />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Så fungerar det</h2>
        <ProcessSteps />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Genomförda renoveringar</h2>
        <ProjectShowcase />
      </section>

      <section className={styles.section}>
        <PartnershipInfo />
      </section>
    </main>
  );
}
