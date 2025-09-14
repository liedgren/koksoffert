import styles from "./ProjectShowcase.module.css";
import { useReferences, ReferenceItem } from "@/lib/hooks/useReferences";

export default async function ProjectShowcase() {
  const examples: ReferenceItem[] = await useReferences();

  return (
    <section className={styles.kitchenExamples}>
      <div className={styles.container}>
        <div className={styles.cards}>
          {examples.map((example) => (
            <div key={example.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img
                  src={example.image}
                  alt={example.alt}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{example.title}</h3>
                <p className={styles.cardDescription}>{example.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
