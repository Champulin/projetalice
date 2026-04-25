const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export interface VaccinationType {
  id: number;
  name: string;
  is_mandatory: boolean;
}

export async function getVaccinationTypes(token: string): Promise<VaccinationType[]> {
  const res = await fetch(`${API}/vaccinations/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load vaccination types");
  return res.json();
}
