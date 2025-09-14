import styles from "./ProcessSteps.module.css";

export default function ProcessSteps() {
  const steps = [
    {
      number: "1",
      title: "Ladda upp din offert",
      description:
        "Ladda upp din nuvarande offert och svara på några enkla frågor.",
    },
    {
      number: "2",
      title: "Vi analyserar",
      description:
        "Vi tar med offerten till vårt nätverk för att hitta en kvalitetsleverantör till ett bättre pris.",
    },
    {
      number: "3",
      title: "Ny offert",
      description:
        "En av våra projektledare hör av sig och guidar dig genom en uppdaterad offert.",
    },
    {
      number: "4",
      title: "Vi drar igång",
      description:
        "Om du accepterar offerten så påbörjar vi ditt projekt. Alltid med en tydlig tidsplan och stöd genom hela processen.",
    },
  ];

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
