import Image from "next/image";
import styles from "./Brands.module.css";

interface Brand {
  name: string;
  logo: string;
  alt: string;
}

interface BrandsProps {
  title?: string;
  brands?: Brand[];
}

const defaultBrands: Brand[] = [
  { name: "IKEA", logo: "/images/brands/ikea.svg", alt: "IKEA" },
  {
    name: "Puustelli",
    logo: "/images/brands/puustelli.svg",
    alt: "Puustelli",
  },
  { name: "Marbodal", logo: "/images/brands/marbodal.svg", alt: "Marbodal" },
  { name: "Kvik", logo: "/images/brands/kvik.svg", alt: "Kvik" },
  {
    name: "Ballingslöv",
    logo: "/images/brands/ballingslov.svg",
    alt: "Ballingslöv",
  },
];

export default function Brands({
  title = "Vi jobbar med ledande märken",
  brands = defaultBrands,
}: BrandsProps) {
  return (
    <section className={styles.brandsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.brandsGrid}>
          {brands.map((brand) => (
            <div key={brand.name} className={styles.brandItem}>
              <Image
                src={brand.logo}
                alt={brand.alt}
                width={120}
                height={60}
                className={styles.brandLogo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
