import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";
import { getStoryBySlug, getStorySlugs } from "@/lib/storyblok";
import { StoryblokStory } from "@/lib/types";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string): Promise<StoryblokStory | null> {
  try {
    const story = await getStoryBySlug(slug, "article");
    return story;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found - Koksoffert",
    };
  }

  return {
    title: `${article.content.title} - Koksoffert`,
    description: article.content.excerpt,
    keywords: `kitchen, ${article.content.category.toLowerCase()}, professional kitchen, ${article.content.title.toLowerCase()}`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/artiklar">← Back to Artiklar</Link>
        </nav>

        <article className="article-content">
          <header className="article-header">
            <div className="article-meta">
              <span className="article-category">
                {article.content.category}
              </span>
              <span className="article-date">
                {new Date(article.published_at).toLocaleDateString()}
              </span>
              <span className="article-read-time">
                {article.content.readTime}
              </span>
            </div>
            <h1 className="article-title">{article.content.title}</h1>
            <p className="article-excerpt">{article.content.excerpt}</p>
          </header>

          <div className="article-body">{render(article.content.content)}</div>
        </article>
      </div>
    </main>
  );
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const slugs = await getStorySlugs("article");
    return slugs.map((slug: string) => ({
      slug,
    }));
  } catch (error) {
    console.error("Failed to fetch article slugs:", error);
    return [];
  }
}
