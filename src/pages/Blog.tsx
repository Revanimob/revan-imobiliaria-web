
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Como escolher o imóvel ideal para sua família",
      excerpt: "Descubra as principais dicas para encontrar o imóvel perfeito que atenda todas as necessidades da sua família.",
      author: "REVAN Imobiliária",
      date: "15 de Dezembro, 2024",
      readTime: "5 min",
      image: "/placeholder.svg",
      category: "Dicas"
    },
    {
      id: 2,
      title: "Tendências do mercado imobiliário em 2024",
      excerpt: "Análise completa das principais tendências que estão moldando o mercado imobiliário brasileiro.",
      author: "REVAN Imobiliária",
      date: "12 de Dezembro, 2024",
      readTime: "7 min",
      image: "/placeholder.svg",
      category: "Mercado"
    },
    {
      id: 3,
      title: "Financiamento imobiliário: guia completo",
      excerpt: "Tudo que você precisa saber sobre financiamento imobiliário, desde a documentação até a aprovação.",
      author: "REVAN Imobiliária",
      date: "10 de Dezembro, 2024",
      readTime: "10 min",
      image: "/placeholder.svg",
      category: "Financiamento"
    },
    {
      id: 4,
      title: "Investir em imóveis: vale a pena?",
      excerpt: "Análise dos prós e contras do investimento imobiliário e como começar no mercado.",
      author: "REVAN Imobiliária",
      date: "8 de Dezembro, 2024",
      readTime: "6 min",
      image: "/placeholder.svg",
      category: "Investimento"
    },
    {
      id: 5,
      title: "Documentação necessária para compra de imóvel",
      excerpt: "Lista completa de todos os documentos necessários para uma compra segura.",
      author: "REVAN Imobiliária",
      date: "5 de Dezembro, 2024",
      readTime: "4 min",
      image: "/placeholder.svg",
      category: "Documentação"
    },
    {
      id: 6,
      title: "Como valorizar seu imóvel para venda",
      excerpt: "Dicas práticas para aumentar o valor do seu imóvel antes de colocá-lo à venda.",
      author: "REVAN Imobiliária",
      date: "3 de Dezembro, 2024",
      readTime: "8 min",
      image: "/placeholder.svg",
      category: "Vendas"
    }
  ];

  const categories = ["Todos", "Dicas", "Mercado", "Financiamento", "Investimento", "Documentação", "Vendas"];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-wine to-wine-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog REVAN Imobiliária
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            Fique por dentro das últimas novidades do mercado imobiliário, 
            dicas valiosas e insights dos nossos especialistas.
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
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto">
                <img 
                  src="/placeholder.svg" 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-wine text-white px-3 py-1 rounded-full text-xs">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{blogPosts[0].author}</span>
                  </div>
                  <Button className="bg-wine hover:bg-wine-dark text-white">
                    Ler mais
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video">
                <img 
                  src={post.image} 
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
                    {post.readTime}
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
                    {post.date}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-wine hover:text-wine-dark"
                  >
                    Ler mais
                    <ArrowRight className="w-3 h-3 ml-1" />
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

      <Footer />
    </div>
  );
};

export default Blog;
