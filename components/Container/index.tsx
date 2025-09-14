import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "full";
}

export default function Container({
  children,
  className = "",
  size = "large",
}: ContainerProps) {
  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      {children}
    </div>
  );
}
