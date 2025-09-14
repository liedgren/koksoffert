import styles from "./PageHero.module.css";

interface PageHeroProps {
  backgroundImage: string;
  height?: "minimal" | "short" | "medium" | "tall";
}

export default function PageHero({
  backgroundImage,
  height = "short",
}: PageHeroProps) {
  return (
    <section
      className={`${styles.pageHero} ${styles[height]}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
  );
}
