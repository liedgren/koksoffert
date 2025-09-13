import type { Metadata } from "next";
import ArticlesList from "@/components/ArticlesList";
import { useArticles } from "@/lib/hooks/useArticles";

export const metadata: Metadata = {
  title: "Kitchen Artiklar - Koksoffert",
  description:
    "Expert artiklar about kitchen design, equipment, and professional kitchen solutions.",
  keywords:
    "kitchen artiklar, kitchen design, professional kitchen, kitchen equipment, catering",
};

export default async function ArticlesPage() {
  const articles = await useArticles();

  return (
    <main>
      <div className="container">
        <ArticlesList articles={articles} />
      </div>
    </main>
  );
}
