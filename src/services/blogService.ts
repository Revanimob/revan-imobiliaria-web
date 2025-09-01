import { BlogPost } from "@/types/blog";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_PROD}/api/blog`;

// 🔹 Criar novo post
export async function addBlogPostService(payload: Partial<BlogPost>) {
  const response = await axios.post(`${BASE_URL}/posts`, payload);
  return response.data;
}

// 🔹 Buscar todos os posts
export async function getAllBlogPostsService() {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
}

// 🔹 Buscar post por ID
export async function getBlogPostByIdService(id: number) {
  const response = await axios.get(`${BASE_URL}/posts/${id}`);
  return response.data;
}

// 🔹 Atualizar post
export async function updateBlogPostService(
  id: number,
  payload: Partial<BlogPost>
) {
  const response = await axios.put(`${BASE_URL}/posts/${id}`, payload);
  return response.data;
}

// 🔹 Deletar post
export async function deleteBlogPostService(id: number) {
  const response = await axios.delete(`${BASE_URL}/posts/${id}`);
  return response.data;
}

// 🔹 Buscar posts publicados (para o site público)
export async function getPublishedBlogPostsService() {
  const response = await axios.get(`${BASE_URL}/posts/published`);
  return response.data;
}