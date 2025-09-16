import Link from "next/link";
import { ArticlesListProps } from "./types";
import styles from "./ArticlesList.module.css";

export default function ArticlesList({
  articles,
  showTitle = true,
  showIntro = true,
  maxArticles,
  className = "",
  customStyles,
}: ArticlesListProps) {
  // Limit articles if maxArticles is specified
  const displayArticles = maxArticles
    ? articles.slice(0, maxArticles)
    : articles;

  // Use custom styles if provided, otherwise fall back to default styles
  const activeStyles = customStyles || styles;

  return (
    <div className={`${activeStyles.articlesSection} ${className}`}>
      {showTitle && (
        <h1 className={activeStyles.articlesTitle}>Kitchen Artiklar & Resources</h1>
      )}

      {showIntro && (
        <p className={activeStyles.articlesIntro}>
          Expert insights and practical advice for professional kitchen design,
          equipment selection, and industry best practices.
        </p>
      )}

      {displayArticles.length === 0 ? (
        <div className={activeStyles.noArticles}>
          <p>No artiklar available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className={activeStyles.articlesGrid}>
          {displayArticles.map((article) => (
            <Link href={`/artiklar/${article.slug}`} key={article.id}>
              <article className={activeStyles.articleCard}>
                <div className={activeStyles.articleImage}>
                  <img
                    src={
                      article.image ||
                      "/images/articles/article-placeholder.jpg"
                    }
                    alt={article.title}
                    className={activeStyles.image}
                  />
                </div>
                <div className={activeStyles.articleContent}>
                  <div className={activeStyles.articleMeta}>
                    <span className={activeStyles.articleDate}>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className={activeStyles.articleTitle}>{article.title}</h2>
                  <p className={activeStyles.articleExcerpt}>{article.excerpt}</p>
                  <div className={activeStyles.articleFooter}>
                    <span className={activeStyles.articleReadTime}>
                      {article.readTime}
                    </span>
                    <div className={activeStyles.articleLink}>Läs mer →</div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
