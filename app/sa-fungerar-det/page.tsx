import PageHero from "@/components/PageHero";
import ProcessSteps from "@/components/ProcessSteps";
import PartnershipInfo from "@/components/PartnershipInfo";
import Container from "@/components/Container";
import styles from "@/styles/page-layout.module.css";
import pageStyles from "./page.module.css";

export default function HowItWorksPage() {
  const benefits = [
    {
      title: "Expertis",
      description: "15+ års erfarenhet av professionella kök",
    },
    {
      title: "Kvalitet",
      description: "Endast högkvalitativa produkter från ledande leverantörer",
    },
    {
      title: "Service",
      description: "Full service från planering till installation",
    },
    {
      title: "Support",
      description: "Långsiktig support och underhåll",
    },
  ];

  return (
    <main>
      <PageHero
        backgroundImage="/images/backgrounds/hero3.jpg"
        height="minimal"
      />

      <h2 className={styles.sectionTitle}>Så fungerar det</h2>
      <ProcessSteps />

      <Container>
        <h2 className={styles.sectionTitle}>Varför välja oss?</h2>
        <div className={styles.pageContainer}>
          <div className={pageStyles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={pageStyles.benefitItem}>
                <h3 className={pageStyles.benefitTitle}>{benefit.title}</h3>
                <p className={pageStyles.benefitDescription}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <PartnershipInfo />
    </main>
  );
}
