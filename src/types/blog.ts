export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  status: "rascunho" | "publicado" | "arquivado";
  category: string;
  tags: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  readTime?: number;
  views?: number;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}