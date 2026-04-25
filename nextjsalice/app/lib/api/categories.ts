const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export interface Category {
  id: number;
  name: string;
  description: string;
}

export async function getCategories(token: string): Promise<Category[]> {
  const res = await fetch(`${API}/categories/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}
