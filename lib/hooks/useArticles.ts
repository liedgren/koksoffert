import { ArticleListItem } from "@/lib/types";
import { getStories } from "@/lib/storyblok";

export async function useArticles(): Promise<ArticleListItem[]> {
  try {
    console.log("Fetching articles from Storyblok...");
    const stories = await getStories("article");
    console.log("Raw stories from Storyblok:", stories);

    // Transform Storyblok stories to our ArticleListItem format
    const articles = stories.map((story: any) => ({
      id: story.id,
      slug: story.slug,
      title: story.content?.title || story.name,
      excerpt: story.content?.excerpt || "",
      category: story.content?.category || "Design",
      readTime: story.content?.readTime || "5 min read",
      publishedAt: story.published_at || story.created_at,
    }));
    
    console.log("Transformed articles:", articles);
    return articles;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}
