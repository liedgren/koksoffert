import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";
import { getStoryBySlug, getStorySlugs } from "@/lib/storyblok";
import { StoryblokStory } from "@/lib/types";
import styles from "./article.module.css";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Helper function to extract image URL from Storyblok image field
function getImageUrl(image: any): string {
  if (typeof image === "string") {
    return image;
  }
  if (image?.filename) {
    return image.filename;
  }
  if (image?.field?.filename) {
    return image.field.filename;
  }
  return "";
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

  const baseUrl = "https://koksoffert.com";
  const articleUrl = `${baseUrl}/artiklar/${params.slug}`;

  // Handle Storyblok image URL construction
  let imageUrl = `${baseUrl}/og-image.jpg`; // Default fallback
  const imagePath = getImageUrl(article.content.image);

  if (imagePath) {
    // If it's already a full URL, use it directly
    if (imagePath.startsWith("http")) {
      imageUrl = imagePath;
    } else {
      // Construct Storyblok image URL
      imageUrl = `https://img2.storyblok.com/1200x630/${imagePath}`;
    }
  }

  return {
    title: `${article.content.title} - Koksoffert`,
    description: article.content.excerpt,
    keywords: `kitchen, ${article.content.category.toLowerCase()}, professional kitchen, ${article.content.title.toLowerCase()}`,
    authors: [{ name: "Koksoffert Team" }],
    openGraph: {
      title: `${article.content.title} - Koksoffert`,
      description: article.content.excerpt,
      url: articleUrl,
      siteName: "Koksoffert",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.content.title,
        },
      ],
      locale: "en_US",
      type: "article",
      authors: ["Koksoffert Team"],
      section: article.content.category,
      tags: [article.content.category, "kitchen", "professional"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.content.title} - Koksoffert`,
      description: article.content.excerpt,
      images: [imageUrl],
      creator: "@koksoffert",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  // Debug image data
  console.log("Article image data:", article.content.image);

  const baseUrl = "https://koksoffert.com";
  const articleUrl = `${baseUrl}/artiklar/${params.slug}`;

  // Handle Storyblok image URL construction
  let imageUrl = `${baseUrl}/og-image.jpg`; // Default fallback
  const imagePath = getImageUrl(article.content.image);

  if (imagePath) {
    // If it's already a full URL, use it directly
    if (imagePath.startsWith("http")) {
      imageUrl = imagePath;
    } else {
      // Construct Storyblok image URL
      imageUrl = `https://img2.storyblok.com/1200x630/${imagePath}`;
    }
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.content.title,
    description: article.content.excerpt,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: "Koksoffert Team",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Koksoffert",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: article.published_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: article.content.category,
    keywords: [article.content.category, "kitchen", "professional", "catering"],
    wordCount: article.content.content?.length || 0,
    timeRequired: article.content.readTime,
    url: articleUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        {/* Hero Section with Article Image */}
        <div className={styles.articleHero}>
          <img
            src={imagePath || "/images/articles/article-placeholder.jpg"}
            alt={article.content.title}
            className={styles.heroImage}
          />
        </div>

        {/* Article Header Below Hero */}
        <div className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <span className={styles.articleCategory} itemProp="articleSection">
              {article.content.category}
            </span>
            <time
              className={styles.articleDate}
              dateTime={article.published_at}
              itemProp="datePublished"
            >
              {new Date(article.published_at).toLocaleDateString()}
            </time>
            <span className={styles.articleReadTime} itemProp="timeRequired">
              {article.content.readTime}
            </span>
          </div>
          <h1 className={styles.articleTitle} itemProp="headline">
            {article.content.title}
          </h1>
          <p className={styles.articleExcerpt} itemProp="description">
            {article.content.excerpt}
          </p>
        </div>

        {/* Article Content */}
        <div className={styles.articleContainer}>
          <article
            className={styles.articleContent}
            itemScope
            itemType="https://schema.org/Article"
          >
            <div className={styles.articleBody} itemProp="articleBody">
              {render(article.content.content)}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const slugs = await getStorySlugs("article");
    console.log("Generating static params for slugs:", slugs);

    // Extract the actual slug from the full_slug if needed
    return slugs.map((slug: string) => {
      // If slug contains 'artiklar/', extract just the article part
      const cleanSlug = slug.includes("artiklar/")
        ? slug.replace("artiklar/", "")
        : slug;

      return {
        slug: cleanSlug,
      };
    });
  } catch (error) {
    console.error("Failed to fetch article slugs:", error);
    return [];
  }
}
