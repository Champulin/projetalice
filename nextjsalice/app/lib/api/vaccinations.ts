import { API_BASE } from "./config";

export interface VaccinationType {
  id: number;
  name: string;
  is_mandatory: boolean;
}

export async function getVaccinationTypes(token: string): Promise<VaccinationType[]> {
  const res = await fetch(`${API_BASE}/vaccinations/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load vaccination types");
  return res.json();
}
