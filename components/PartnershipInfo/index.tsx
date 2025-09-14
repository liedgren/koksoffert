import styles from "./PartnershipInfo.module.css";

export default function PartnershipInfo() {
  const stats = [
    {
      number: "500+",
      label: "Certifierade leverantörer",
    },
    {
      number: "10 år",
      label: "På marknaden",
    },
    {
      number: "50 000+",
      label: "Nöjda kunder",
    },
  ];

  return (
    <section className={styles.partnershipInfo}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>En del av Tom</h2>
            <p className={styles.description}>
              Vi är stolta över att vara en del av Tom.se - Sveriges största
              marknadsplats för tjänster i hemmet. Detta ger oss tillgång till
              det bästa nätverket av certifierade köksspecialister i hela
              landet.
            </p>
          </div>

          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
