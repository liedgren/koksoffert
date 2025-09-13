import Link from "next/link";
import { ArticlesListProps } from "./types";

export default function ArticlesList({
  articles,
  showTitle = true,
  showIntro = true,
  maxArticles,
  className = "",
}: ArticlesListProps) {
  // Limit articles if maxArticles is specified
  const displayArticles = maxArticles
    ? articles.slice(0, maxArticles)
    : articles;

  return (
    <div className={`articles-section ${className}`}>
      {showTitle && (
        <h1 className="articles-title">Kitchen Artiklar & Resources</h1>
      )}

      {showIntro && (
        <p className="articles-intro">
          Expert insights and practical advice for professional kitchen design,
          equipment selection, and industry best practices.
        </p>
      )}

      {displayArticles.length === 0 ? (
        <div className="no-articles">
          <p>No artiklar available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="articles-grid">
          {displayArticles.map((article) => (
            <article key={article.id} className="article-card">
              <div className="article-meta">
                <span className="article-category">{article.category}</span>
                <span className="article-date">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="article-title">
                <Link href={`/artiklar/${article.slug}`}>{article.title}</Link>
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
  );
}
