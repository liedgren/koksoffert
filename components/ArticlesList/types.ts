import { ArticleListItem } from "@/lib/types";

export interface ArticlesListProps {
  articles: ArticleListItem[];
  showTitle?: boolean;
  showIntro?: boolean;
  maxArticles?: number;
  className?: string;
  customStyles?: any;
}
