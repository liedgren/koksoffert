import { Suspense } from "react";
import styles from "./terms.module.css";

function TermsContent() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Villkor</h1>
        <p className={styles.subtitle}>
          Användarvillkor för Koksoffert-tjänsten
        </p>

        <h2>Användarvillkor</h2>
        <p>
          Genom att använda Koksoffert-tjänsten accepterar du dessa villkor. Läs
          igenom dem noggrant innan du använder vår tjänst.
        </p>

        <h3>1. Tjänstens omfattning</h3>
        <p>
          Koksoffert erbjuder en tjänst för att hjälpa dig få bättre priser på
          köksrenovering genom förhandling med leverantörer. Vi agerar som
          mellanhand mellan dig och köksleverantörer.
        </p>

        <h3>2. Användarens ansvar</h3>
        <p>Som användare förbinder du dig att:</p>
        <ul>
          <li>Lämna korrekt och fullständig information</li>
          <li>Inte ladda upp felaktiga eller vilseledande dokument</li>
          <li>Respektera leverantörernas immateriella rättigheter</li>
          <li>Använda tjänsten endast för lagliga ändamål</li>
        </ul>

        <h3>3. Vårt ansvar</h3>
        <p>
          Vi strävar efter att ge dig bästa möjliga service, men kan inte
          garantera specifika resultat eller besparingar. Vårt ansvar är
          begränsat till att förmedla din förfrågan till lämpliga leverantörer.
        </p>

        <h3>4. Leverantörsrelationer</h3>
        <p>
          Vi har kommersiella relationer med köksleverantörer i vårt nätverk.
          Detta påverkar inte vår objektivitet i att hitta bästa lösning för
          dig.
        </p>

        <h3>5. Kostnader och betalning</h3>
        <p>
          Vår grundtjänst är kostnadsfri för dig. Vi får ersättning från
          leverantörer när en affär genomförs. Inga dolda kostnader eller
          avgifter tillkommer dig.
        </p>

        <h3>6. Avslut av tjänst</h3>
        <p>
          Vi förbehåller oss rätten att avsluta eller begränsa din användning av
          tjänsten om du bryter mot dessa villkor.
        </p>

        <h3>7. Ändringar av villkor</h3>
        <p>
          Vi kan ändra dessa villkor när som helst. Fortsatt användning av
          tjänsten efter ändringar innebär acceptans av de nya villkoren.
        </p>

        <h3>8. Tillämplig lag</h3>
        <p>
          Dessa villkor regleras av svensk lag. Eventuella tvister ska lösas
          enligt svensk rätt.
        </p>

        <h3>9. Kontakt</h3>
        <p>För frågor om dessa villkor, kontakta oss på:</p>
        <ul>
          <li>E-post: info@koksoffert.se</li>
          <li>Telefon: 08 - 123 456 78</li>
        </ul>

        <p className={styles.lastUpdated}>
          Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
        </p>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return <TermsContent />;
}
