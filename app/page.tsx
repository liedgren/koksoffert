import type { Metadata } from "next";
import Link from "next/link";
import ArticlesList from "@/components/ArticlesList";
import { useArticles } from "@/lib/hooks/useArticles";

export const metadata: Metadata = {
  title: "Koksoffert - Professional Kitchen Offers",
  description: "Get professional kitchen offers and quotes for your business.",
};

export default async function HomePage() {
  const articles = await useArticles();

  return (
    <main>
      <div className="container">
        <section className="hero-section">
          <h1>Koksoffert</h1>
          <p>Professional kitchen offers and quotes for your business.</p>
          <div className="cta-buttons">
            <Link href="/offer" className="cta-button">
              Get Your Offer
            </Link>
            <Link href="/artiklar" className="cta-button secondary">
              Read Artiklar
            </Link>
          </div>
        </section>

        {articles.length > 0 && (
          <section className="featured-articles">
            <h2>Featured Articles</h2>
            <ArticlesList
              articles={articles}
              showTitle={false}
              showIntro={false}
              maxArticles={3}
              className="featured-articles-list"
            />
            <div className="text-center">
              <Link href="/artiklar" className="cta-button secondary">
                View All Articles
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
