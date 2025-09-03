import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "@/types/blog";
import {
  getAllBlogPostsService,
  getPublishedBlogPostsService,
} from "@/services/blogService";
import ReadMoreBlog from "@/components/blog/ReadMoreBlog";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const navigate = useNavigate();

  const categories = [
    // "Todos",
    // "Dicas",
    // "Mercado",
    // "Financiamento",
    // "Investimento",
    // "Documentação",
    // "Vendas",
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const posts = await getAllBlogPostsService();
        setBlogs(posts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Carregando posts...</div>;
  }

  if (!blogs.length) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-wine to-wine-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog REVAN Imobiliária
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            Fique por dentro das últimas novidades do mercado imobiliário, dicas
            valiosas e insights dos nossos especialistas.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-wine text-wine hover:bg-wine hover:text-white"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {blogs[0] && (
          <div className="mb-16">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Imagem */}
                <div className="w-full aspect-video md:aspect-[4/3] lg:aspect-[16/9]">
                  <img
                    src={blogs[0].featuredImage || "/placeholder.svg"}
                    alt={blogs[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Conteúdo */}
                <CardContent className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="bg-wine text-white px-3 py-1 rounded-full text-xs">
                        {blogs[0].category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogs[0].publishDate).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogs[0].readTime ? `${blogs[0].readTime} min` : "-"}
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {blogs[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {blogs[0].excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {blogs[0].author}
                      </span>
                    </div>
                    <Button
                      className="bg-wine hover:bg-wine-dark text-white"
                      onClick={() =>
                        navigate("/blog/read", { state: { blog: blogs[0] } })
                      } // passa o blog por state
                    >
                      Ler mais
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(1).map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video">
                <img
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span className="bg-wine bg-opacity-10 text-wine px-3 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime ? `${post.readTime} min` : "-"}
                  </div>
                </div>
                <CardTitle className="text-lg hover:text-wine transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishDate).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <Button
                    className="bg-wine hover:bg-wine-dark text-white"
                    onClick={() =>
                      navigate("/blog/read", {
                        state: { blog: post },
                      })
                    }
                  >
                    Ler mais
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-wine text-wine hover:bg-wine hover:text-white px-8"
          >
            Carregar mais posts
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Blog;
