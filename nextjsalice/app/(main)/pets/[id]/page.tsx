"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPet, deletePet, addVaccination, deleteVaccination, Pet, PetVaccination } from "../../../lib/api/pets";
import { getVaccinationTypes, VaccinationType } from "../../../lib/api/vaccinations";
import Navbar from "../../../components/home/Navbar";
import Footer from "../../../components/home/Footer";

const MEDIA = "http://127.0.0.1:8000";

export default function PetDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const petId = Number(id);

  const [pet, setPet] = useState<Pet | null>(null);
  const [vacTypes, setVacTypes] = useState<VaccinationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [showVacForm, setShowVacForm] = useState(false);
  const [vacForm, setVacForm] = useState({ vaccination_id: "", vaccination_date: "", valid_until: "" });
  const [vacErrors, setVacErrors] = useState<Record<string, string[]>>({});
  const [vacLoading, setVacLoading] = useState(false);

  const tabs = [
    { label: "← Accueil", href: "/" },
    { label: "Mes mascottes", href: "/pets" },
    { label: "+ Ajouter", href: "/pets/new" },
  ];

  function getToken() {
    const t = localStorage.getItem("access_token");
    if (!t) { router.push("/login"); return null; }
    return t;
  }

  async function reload(token: string) {
    const p = await getPet(petId, token);
    setPet(p);
  }

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    Promise.all([getPet(petId, token), getVaccinationTypes(token)])
      .then(([p, vt]) => { setPet(p); setVacTypes(vt); })
      .catch(() => setError("Impossible de charger la mascotte."))
      .finally(() => setLoading(false));
  }, [petId]);

  async function handleDelete() {
    if (!confirm(`Supprimer ${pet?.name} ? Cette action est irréversible.`)) return;
    const token = getToken();
    if (!token) return;
    await deletePet(petId, token);
    router.push("/pets");
  }

  async function handleAddVaccination(e: React.FormEvent) {
    e.preventDefault();
    setVacErrors({});
    const token = getToken();
    if (!token) return;
    setVacLoading(true);
    try {
      await addVaccination(petId, {
        vaccination_id: Number(vacForm.vaccination_id),
        vaccination_date: vacForm.vaccination_date,
        valid_until: vacForm.valid_until,
      }, token);
      setVacForm({ vaccination_id: "", vaccination_date: "", valid_until: "" });
      setShowVacForm(false);
      await reload(token);
    } catch (err: unknown) {
      if (err && typeof err === "object") setVacErrors(err as Record<string, string[]>);
      else setVacErrors({ non_field_errors: ["Une erreur s'est produite."] });
    } finally {
      setVacLoading(false);
    }
  }

  async function handleDeleteVac(vacId: number) {
    const token = getToken();
    if (!token) return;
    await deleteVaccination(petId, vacId, token);
    await reload(token);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pastel-bg flex items-center justify-center">
        <p className="text-pastel-muted">Chargement…</p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-pastel-bg flex items-center justify-center">
        <p className="text-red-400">{error || "Mascotte introuvable."}</p>
      </div>
    );
  }

  const alreadyVaccinated = new Set(pet.vaccinations.map(v => v.vaccination.id));
  const availableVacTypes = vacTypes.filter(vt => !alreadyVaccinated.has(vt.id));

  return (
    <div className="min-h-screen bg-pastel-bg text-pastel-text flex flex-col">
      <Navbar tabs={tabs} isOpen={isOpen} onToggle={() => setIsOpen(o => !o)} />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
        <button
          onClick={() => router.push("/pets")}
          className="text-sm text-pastel-muted hover:text-pastel-text self-start"
        >
          ← Mes mascottes
        </button>

        {/* Pet card */}
        <div className="bg-pastel-surface rounded-2xl border border-pastel-border shadow-lg p-6 flex gap-6 items-start flex-wrap">
          <div className="w-32 h-32 rounded-xl bg-pastel-bg border border-pastel-border flex items-center justify-center overflow-hidden flex-shrink-0">
            {pet.picture
              ? <img src={`${MEDIA}${pet.picture}`} alt={pet.name} className="w-full h-full object-cover" />
              : <span className="text-5xl">🐾</span>}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{pet.name}</h1>
            <p className="text-pastel-muted text-sm">{pet.category?.name}</p>
            {pet.birth_date && <p className="text-pastel-muted text-sm">Né(e) le {pet.birth_date}</p>}
            <p className="text-pastel-muted text-sm">Propriétaire : {pet.owner_username}</p>
            <p className="text-xs text-pastel-border mt-1">
              Ajouté le {new Date(pet.created_at).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition"
          >
            Supprimer
          </button>
        </div>

        {/* Vaccinations */}
        <div className="bg-pastel-surface rounded-2xl border border-pastel-border shadow-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Vaccinations</h2>
            {availableVacTypes.length > 0 && (
              <button
                onClick={() => setShowVacForm(v => !v)}
                className="px-4 py-1.5 bg-pastel-primary text-white text-sm font-semibold rounded-lg shadow hover:opacity-90 transition"
              >
                {showVacForm ? "Annuler" : "+ Ajouter"}
              </button>
            )}
          </div>

          {/* Add vaccination form */}
          {showVacForm && (
            <form onSubmit={handleAddVaccination} className="mb-6 bg-pastel-bg rounded-xl border border-pastel-border p-4 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">Vaccin</label>
                  <select
                    className="px-3 py-2 rounded-lg border border-pastel-border bg-white text-pastel-text text-sm focus:outline-none focus:ring-2 focus:ring-pastel-primary/40"
                    value={vacForm.vaccination_id}
                    onChange={e => setVacForm(f => ({ ...f, vaccination_id: e.target.value }))}
                    required
                  >
                    <option value="">Sélectionner…</option>
                    {availableVacTypes.map(vt => (
                      <option key={vt.id} value={vt.id}>
                        {vt.name}{vt.is_mandatory ? " *" : ""}
                      </option>
                    ))}
                  </select>
                  {vacErrors.vaccination_id && <span className="text-xs text-red-500">{vacErrors.vaccination_id[0]}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">Date</label>
                  <input
                    className="px-3 py-2 rounded-lg border border-pastel-border bg-white text-pastel-text text-sm focus:outline-none focus:ring-2 focus:ring-pastel-primary/40"
                    type="date"
                    value={vacForm.vaccination_date}
                    onChange={e => setVacForm(f => ({ ...f, vaccination_date: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">Valide jusqu'au</label>
                  <input
                    className="px-3 py-2 rounded-lg border border-pastel-border bg-white text-pastel-text text-sm focus:outline-none focus:ring-2 focus:ring-pastel-primary/40"
                    type="date"
                    value={vacForm.valid_until}
                    onChange={e => setVacForm(f => ({ ...f, valid_until: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {vacErrors.non_field_errors && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {vacErrors.non_field_errors[0]}
                </p>
              )}

              <button
                type="submit"
                disabled={vacLoading}
                className="self-start px-5 py-2 bg-pastel-primary text-white text-sm font-semibold rounded-lg shadow hover:opacity-90 transition disabled:opacity-60"
              >
                {vacLoading ? "Enregistrement…" : "Enregistrer →"}
              </button>
            </form>
          )}

          {/* Vaccination list */}
          {pet.vaccinations.length === 0 ? (
            <p className="text-pastel-muted text-sm text-center py-6">Aucune vaccination enregistrée.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {pet.vaccinations.map((v: PetVaccination) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between bg-pastel-bg rounded-xl border border-pastel-border px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-sm flex items-center gap-2">
                      {v.vaccination.name}
                      {v.vaccination.is_mandatory && (
                        <span className="text-xs bg-pastel-primary text-white px-2 py-0.5 rounded-full">
                          obligatoire
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-pastel-muted mt-0.5">
                      {v.vaccination_date ?? "—"} → {v.valid_until ?? "—"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteVac(v.id)}
                    className="text-pastel-border hover:text-red-400 transition text-lg leading-none pl-4"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
