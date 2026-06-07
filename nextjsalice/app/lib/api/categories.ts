import { API_BASE } from "./config";

export interface Category {
  id: number;
  name: string;
  description: string;
}

export async function getCategories(token: string): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json() as Promise<Category[]>;
}
