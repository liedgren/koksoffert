import { getStories } from "@/lib/storyblok";
import { ReferenceStory } from "@/lib/types";

export interface ReferenceItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export async function useReferences(): Promise<ReferenceItem[]> {
  try {
    const stories = await getStories("reference");

    // Transform Storyblok stories to our ReferenceItem format
    const references = stories
      .slice(0, 3) // Get only the first 3
      .map((story: ReferenceStory) => ({
        id: story.id,
        slug: story.slug,
        title: story.content?.title || story.name,
        description: story.content?.description || story.content?.savings || "",
        image: story.content?.image?.filename || "/images/references/reference_1.jpg",
        alt: story.content?.image?.alt || story.content?.title || story.name,
      }));
    
    return references;
  } catch (error) {
    console.error("Failed to fetch references:", error);
    // Return fallback data if Storyblok fails
    return [
      {
        id: 1,
        slug: "modernt-koek-i-stockholm",
        title: "Modernt kök i centrala Stockholm",
        description: "Sparade 25%",
        image: "/images/references/reference_1.jpg",
        alt: "Modern kök i Stockholm",
      },
      {
        id: 2,
        slug: "klassisk-koek-goeteborg",
        title: "Klassisk Kök Göteborg",
        description: "Special 30% Rabatt",
        image: "/images/references/reference_2.jpg",
        alt: "Klassisk kök i Göteborg",
      },
      {
        id: 3,
        slug: "minimalistisk-koek-malmo",
        title: "Minimalistisk Kök Malmö",
        description: "Spara 20% på Komplett Paket",
        image: "/images/references/reference_3.jpg",
        alt: "Minimalistisk kök i Malmö",
      },
    ];
  }
}
