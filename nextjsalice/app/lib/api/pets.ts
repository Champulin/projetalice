const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export interface VaccinationType {
  id: number;
  name: string;
  is_mandatory: boolean;
}

export interface PetVaccination {
  id: number;
  vaccination: VaccinationType;
  vaccination_date: string | null;
  valid_until: string | null;
}

export interface Pet {
  id: number;
  name: string;
  category: { id: number; name: string; description: string };
  owner_username: string;
  picture?: string | null;
  birth_date?: string | null;
  created_at: string;
  vaccinations: PetVaccination[];
}

function authHeaders(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }
  return res.json();
}

export async function getPets(token: string): Promise<Pet[]> {
  const res = await fetch(`${API}/pets/`, { headers: authHeaders(token) });
  return handleResponse<Pet[]>(res);
}

export async function getPet(id: number, token: string): Promise<Pet> {
  const res = await fetch(`${API}/pets/${id}/`, { headers: authHeaders(token) });
  return handleResponse<Pet>(res);
}

export async function createPet(data: FormData, token: string): Promise<Pet> {
  const res = await fetch(`${API}/pets/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  return handleResponse<Pet>(res);
}

export async function updatePet(id: number, data: FormData, token: string): Promise<Pet> {
  const res = await fetch(`${API}/pets/${id}/`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  return handleResponse<Pet>(res);
}

export async function deletePet(id: number, token: string): Promise<void> {
  const res = await fetch(`${API}/pets/${id}/`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete pet");
}

export async function addVaccination(
  petId: number,
  data: { vaccination_id: number; vaccination_date: string; valid_until: string },
  token: string
): Promise<PetVaccination> {
  const res = await fetch(`${API}/pets/${petId}/vaccinations/`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<PetVaccination>(res);
}

export async function deleteVaccination(petId: number, vacId: number, token: string): Promise<void> {
  const res = await fetch(`${API}/pets/${petId}/vaccinations/${vacId}/`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete vaccination");
}
