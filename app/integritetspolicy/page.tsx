import styles from "../terms/terms.module.css";

export default function IntegritetspolicyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Integritetspolicy</h1>
        <p className={styles.subtitle}>
          Vi värnar om din integritet och personuppgifter
        </p>

        <h2>Integritetspolicy</h2>
        <p>
          Denna integritetspolicy beskriver hur Koksoffert samlar in, använder
          och skyddar dina personuppgifter i enlighet med GDPR (General Data
          Protection Regulation).
        </p>

        <h3>Vilka personuppgifter samlar vi in?</h3>
        <p>Vi samlar in följande typer av personuppgifter:</p>
        <ul>
          <li>Namn och kontaktuppgifter (telefonnummer, e-postadress)</li>
          <li>Information om din köksrenovering</li>
          <li>Uppladdade dokument (offertfiler)</li>
          <li>Teknisk information (IP-adress, webbläsartyp)</li>
        </ul>

        <h3>Hur använder vi dina personuppgifter?</h3>
        <p>Vi använder dina personuppgifter för att:</p>
        <ul>
          <li>Hantera din förfrågan om köksoffert</li>
          <li>Förhandla bättre priser med leverantörer</li>
          <li>Kommunicera med dig om din förfrågan</li>
          <li>Förbättra vår tjänst</li>
        </ul>

        <h3>Dela vi dina uppgifter?</h3>
        <p>
          Vi delar endast dina personuppgifter med leverantörer som är
          nödvändiga för att fullfölja din förfrågan. Vi säljer aldrig dina
          personuppgifter till tredje part.
        </p>

        <h3>Dina rättigheter</h3>
        <p>Du har rätt att:</p>
        <ul>
          <li>Få tillgång till dina personuppgifter</li>
          <li>Rätta felaktiga uppgifter</li>
          <li>Ta bort dina personuppgifter</li>
          <li>Invända mot behandling</li>
          <li>Dataportabilitet</li>
        </ul>

        <h3>Datasäkerhet</h3>
        <p>
          Vi implementerar lämpliga tekniska och organisatoriska
          säkerhetsåtgärder för att skydda dina personuppgifter mot obehörig
          åtkomst, förlust eller skada.
        </p>

        <h3>Kontakt</h3>
        <p>
          Om du har frågor om denna integritetspolicy eller vill utöva dina
          rättigheter, kontakta oss på:
        </p>
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
