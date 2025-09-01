import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  BookOpen,
  Calendar,
  User,
  Tag,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  addBlogPostService,
  deleteBlogPostService,
  getAllBlogPostsService,
  updateBlogPostService,
} from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { uploadToImgBB } from "@/services/imgBBService";
import ConfirmDialog from "@/components/dialog/cancelDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AdminBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const currentItems = posts.slice(startIndex, startIndex + pageSize);

  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    publishDate: new Date().toISOString().split('T')[0],
    status: "rascunho",
    category: "",
    tags: [],
    featuredImage: "",
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllBlogPostsService();
        setPosts(response);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        toast({
          title: "Erro ao carregar posts",
          description: "Verifique sua conexão ou tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updateBlogPostService(editingPost.id!, formData);
        toast({ title: "Post atualizado com sucesso!" });
      } else {
        await addBlogPostService(formData as BlogPost);
        toast({ title: "Post criado com sucesso!" });
      }

      const updated = await getAllBlogPostsService();
      setPosts(updated);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      toast({
        title: "Erro ao salvar post",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags : [],
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    const url = await uploadToImgBB(file);
    if (url) {
      setFormData((prev) => ({ ...prev, featuredImage: url }));
    }
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      await deleteBlogPostService(postToDelete);
      const updated = await getAllBlogPostsService();
      setPosts(updated);
      toast({ title: "Post excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      toast({
        title: "Erro ao excluir post",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const openDeleteDialog = (postId: number) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      publishDate: new Date().toISOString().split('T')[0],
      status: "rascunho",
      category: "",
      tags: [],
      featuredImage: "",
      seoTitle: "",
      seoDescription: "",
    });
    setEditingPost(null);
    setIsModalOpen(false);
  };

  const getStatusBadgeColor = (status: BlogPost["status"]) => {
    const colors = {
      rascunho: "bg-gray-100 text-gray-800",
      publicado: "bg-green-100 text-green-800",
      arquivado: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const getStatusLabel = (status: BlogPost["status"]) => {
    const labels = {
      rascunho: "Rascunho",
      publicado: "Publicado",
      arquivado: "Arquivado",
    };
    return labels[status];
  };

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-10 py-6 max-w-full overflow-x-hidden">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Gestão de Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie todos os posts do blog
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-wine hover:bg-wine-dark"
          >
            <Plus className="w-4 h-4 mr-2" />
            NOVO POST
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold">
                    {posts.length}
                  </p>
                </div>
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-wine" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Publicados
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">
                    {posts.filter((p) => p.status === "publicado").length}
                  </p>
                </div>
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Rascunhos
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-600">
                    {posts.filter((p) => p.status === "rascunho").length}
                  </p>
                </div>
                <FileText className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Arquivados
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-red-600">
                    {posts.filter((p) => p.status === "arquivado").length}
                  </p>
                </div>
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Lista de Posts ({posts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium">Título</th>
                    <th className="text-left p-3 text-sm font-medium">Autor</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                    <th className="text-left p-3 text-sm font-medium">Categoria</th>
                    <th className="text-left p-3 text-sm font-medium">Data</th>
                    <th className="text-left p-3 text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm truncate max-w-[200px]">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                            {post.excerpt}
                          </p>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{post.author}</td>
                      <td className="p-3">
                        <Badge className={getStatusBadgeColor(post.status)}>
                          {getStatusLabel(post.status)}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{post.category}</td>
                      <td className="p-3 text-sm">
                        {new Date(post.publishDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(post.id!)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage(Math.max(1, page - 1))}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setPage(pageNum)}
                            isActive={page === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal for Create/Edit Post */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Editar Post" : "Criar Novo Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: BlogPost["status"]) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                      <SelectItem value="publicado">Publicado</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="publishDate">Data de Publicação</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) =>
                      setFormData({ ...formData, publishDate: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="excerpt">Resumo *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Breve descrição do post..."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="content">Conteúdo *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Conteúdo completo do post..."
                    className="min-h-[200px]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="featuredImage">Imagem Destacada</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {formData.featuredImage && (
                    <div className="mt-2">
                      <img
                        src={formData.featuredImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="seoTitle">Título SEO</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, seoTitle: e.target.value })
                    }
                    placeholder="Título para SEO"
                  />
                </div>

                <div>
                  <Label htmlFor="seoDescription">Descrição SEO</Label>
                  <Input
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, seoDescription: e.target.value })
                    }
                    placeholder="Descrição para SEO"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-wine hover:bg-wine-dark">
                  {editingPost ? "Atualizar" : "Criar"} Post
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Excluir Post"
          description="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;