import PageHero from "@/components/PageHero";
import PartnershipInfo from "@/components/PartnershipInfo";
import Container from "@/components/Container";
import styles from "@/styles/page-layout.module.css";
import pageStyles from "./page.module.css";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        backgroundImage="/images/backgrounds/hero2.jpg"
        height="minimal"
      />

      <Container>
        <h2 className={styles.sectionTitle}>Vår historia</h2>
        <div className={styles.pageContainer}>
          <p className={pageStyles.contentText}>
            Koksoffert grundades med visionen att revolutionera hur
            professionella kök designas och utrustas. Med över 15 års erfarenhet
            inom branschen har vi hjälpt hundratals företag att skapa kök som
            inte bara är funktionella, utan också effektiva och hållbara.
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Vår expertis</h2>
        <div className={styles.pageContainer}>
          <p className={pageStyles.contentText}>
            Vårt team består av certifierade köksdesigners, projektledare och
            tekniska experter som förstår de unika utmaningarna med
            professionella kökmiljöer. Vi arbetar med allt från små caféer till
            stora restaurangkedjor och industriella kök.
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Våra värderingar</h2>
        <div className={styles.pageContainer}>
          <div className={pageStyles.valuesContainer}>
            <div className={pageStyles.valueItem}>
              <div className={pageStyles.valueIcon}>✓</div>
              <div className={pageStyles.valueContent}>
                <h3 className={pageStyles.valueTitle}>Kvalitet</h3>
                <p className={pageStyles.valueDescription}>
                  Vi levererar endast högkvalitativa produkter och tjänster
                </p>
              </div>
            </div>

            <div className={pageStyles.valueItem}>
              <div className={pageStyles.valueIcon}>✓</div>
              <div className={pageStyles.valueContent}>
                <h3 className={pageStyles.valueTitle}>Innovation</h3>
                <p className={pageStyles.valueDescription}>
                  Vi håller oss uppdaterade med senaste tekniken
                </p>
              </div>
            </div>

            <div className={pageStyles.valueItem}>
              <div className={pageStyles.valueIcon}>✓</div>
              <div className={pageStyles.valueContent}>
                <h3 className={pageStyles.valueTitle}>Hållbarhet</h3>
                <p className={pageStyles.valueDescription}>
                  Vi prioriterar miljövänliga och energisnåla lösningar
                </p>
              </div>
            </div>

            <div className={pageStyles.valueItem}>
              <div className={pageStyles.valueIcon}>✓</div>
              <div className={pageStyles.valueContent}>
                <h3 className={pageStyles.valueTitle}>Kundfokus</h3>
                <p className={pageStyles.valueDescription}>
                  Varje projekt är unikt och skräddarsytt för våra kunder
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <PartnershipInfo />
    </main>
  );
}
