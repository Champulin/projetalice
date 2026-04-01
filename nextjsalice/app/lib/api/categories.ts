import { apiFetch } from "./client";

export interface Category {
    id: number;
    name: string;
    description: string;
  }
export const getCategories = () => {
  return apiFetch<Category[]>("/categories/");
};