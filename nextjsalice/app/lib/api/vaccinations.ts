import { apiFetch } from "./client";

export interface VaccinationType {
    id: number;
    name: string;
    is_mandatory: boolean;
  }
  export interface PetVaccination {
    id: number;
    pet: number; // you can also embed the full Pet object if API does so
    vaccination: VaccinationType;
    vaccination_date: string | null; // ISO date string
    valid_until: string | null;      // ISO date string
  }
export const getVaccinations = () => {
  return apiFetch<PetVaccination[]>("/vaccinations/");
};