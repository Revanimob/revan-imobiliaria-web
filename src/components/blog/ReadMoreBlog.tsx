import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, User, Clock } from "lucide-react";
import { BlogPost } from "@/types/blog";
import HeaderOut from "../Header-out";
import FooterOut from "../FooterOut";

export default function ReadMoreBlog() {
  const { state, hash } = useLocation();
  const navigate = useNavigate();
  const blog: BlogPost | undefined = state?.blog;

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  if (!blog) {
    return (
      <div className="text-center py-20">
        Post não encontrado.
        <button
          className="mt-4 px-4 py-2 bg-wine text-white rounded"
          onClick={() => navigate("/")}
        >
          Voltar ao Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderOut />
      <main className="container mx-auto px-4 py-16 flex-1">
        {/* Imagem */}
        <div className="mb-8">
          <img
            src={blog.featuredImage || "/placeholder.svg"}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Conteúdo */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="bg-wine text-white px-3 py-1 rounded-full text-xs">
              {blog.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(blog.publishDate).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blog.readTime ? `${blog.readTime} min` : "-"}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {blog.author}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{blog.content}</p>
        </div>
      </main>
      <FooterOut />
    </div>
  );
}
