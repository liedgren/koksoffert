import Link from "next/link";
import { ArticlesListProps } from "./types";
import styles from "./ArticlesList.module.css";

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
    <div className={`${styles.articlesSection} ${className}`}>
      {showTitle && (
        <h1 className={styles.articlesTitle}>Kitchen Artiklar & Resources</h1>
      )}

      {showIntro && (
        <p className={styles.articlesIntro}>
          Expert insights and practical advice for professional kitchen design,
          equipment selection, and industry best practices.
        </p>
      )}

      {displayArticles.length === 0 ? (
        <div className={styles.noArticles}>
          <p>No artiklar available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className={styles.articlesGrid}>
          {displayArticles.map((article) => (
            <Link href={`/artiklar/${article.slug}`}>
              <article key={article.id} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <img
                    src={
                      article.image ||
                      "/images/articles/article-placeholder.jpg"
                    }
                    alt={article.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.articleMeta}>
                    <span className={styles.articleCategory}>
                      {article.category}
                    </span>
                    <span className={styles.articleDate}>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                  <div className={styles.articleFooter}>
                    <span className={styles.articleReadTime}>
                      {article.readTime}
                    </span>
                    <div className={styles.articleLink}>Läs mer →</div>
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
