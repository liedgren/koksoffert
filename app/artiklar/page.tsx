import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ArticlesList from "@/components/ArticlesList";
import { useArticles } from "@/lib/hooks/useArticles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kitchen Artiklar - Professional Kitchen Resources | Koksoffert",
  description:
    "Expert artiklar about kitchen design, equipment, and professional kitchen solutions. Learn from industry professionals about commercial kitchen best practices.",
  keywords:
    "kitchen artiklar, kitchen design, professional kitchen, kitchen equipment, catering, commercial kitchen, kitchen planning",
  openGraph: {
    title: "Kitchen Artiklar - Professional Kitchen Resources",
    description:
      "Expert artiklar about kitchen design, equipment, and professional kitchen solutions.",
    url: "https://koksoffert.com/artiklar",
    siteName: "Koksoffert",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Artiklar - Professional Kitchen Resources",
    description:
      "Expert artiklar about kitchen design, equipment, and professional kitchen solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ArticlesPage() {
  const articles = await useArticles();

  // Structured data for articles listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kitchen Artiklar",
    description:
      "Expert artiklar about kitchen design, equipment, and professional kitchen solutions",
    url: "https://koksoffert.com/artiklar",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          url: `https://koksoffert.com/artiklar/${article.slug}`,
          datePublished: article.publishedAt,
          articleSection: article.category,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className={styles.mainContainer}>
        <PageHero
          backgroundImage="/images/backgrounds/hero4.jpg"
          height="minimal"
        />

        <h2 className={styles.pageTitle}>Köksnyheter</h2>

        <div className={styles.contentWrapper}>
            <ArticlesList
              articles={articles}
              showTitle={false}
              showIntro={false}
            />
        </div>
      </main>
    </>
  );
}
