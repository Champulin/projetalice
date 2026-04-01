import { apiFetch } from "./client";
import { PetVaccination } from "./vaccinations";
import { Category } from "./categories";

export interface Pet {
  id: number;
  name: string;
  category: number | { id: number; name: string };
  picture?: string; // relative path from Django
  birth_date?: string;
  owner_name?: string;
}

export async function getPets(): Promise<Pet[]> {
    const res = await apiFetch<Pet[]>("/pets/");
  
    return res.map((pet) => ({
      ...pet,
      // Use the picture exactly as returned by the API
      picture: pet.picture ?? undefined,
    }));
  }

export const getPet = (id: number) => {
  return apiFetch<Pet>(`/pets/${id}/`);
};