import type { Metadata } from "next";
import Link from "next/link";
import { getStories } from "@/lib/storyblok";
import { ArticleListItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Kitchen Artiklar - Koksoffert",
  description:
    "Expert artiklar about kitchen design, equipment, and professional kitchen solutions.",
  keywords:
    "kitchen artiklar, kitchen design, professional kitchen, kitchen equipment, catering",
};

async function getArticles(): Promise<ArticleListItem[]> {
  try {
    const stories = await getStories("article");

    // Transform Storyblok stories to our ArticleListItem format
    return stories.map((story: any) => ({
      id: story.id,
      slug: story.slug,
      title: story.content?.title || story.name,
      excerpt: story.content?.excerpt || "",
      category: story.content?.category || "Design",
      readTime: story.content?.readTime || "5 min read",
      publishedAt: story.published_at || story.created_at,
    }));
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <div className="container">
        <h1>Kitchen Artiklar & Resources</h1>
        <p className="articles-intro">
          Expert insights and practical advice for professional kitchen design,
          equipment selection, and industry best practices.
        </p>

        {articles.length === 0 ? (
          <div className="no-articles">
            <p>No artiklar available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <article key={article._id} className="article-card">
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-date">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="article-title">
                  <Link href={`/artiklar/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-footer">
                  <span className="article-read-time">{article.readTime}</span>
                  <Link
                    href={`/artiklar/${article.slug}`}
                    className="article-link"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
