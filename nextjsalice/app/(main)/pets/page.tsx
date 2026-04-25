"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPets, Pet } from "../../lib/api/pets";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";

const MEDIA = "http://127.0.0.1:8000";

export default function PetsPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { label: "← Accueil", href: "/" },
    { label: "Mes mascottes", href: "/pets" },
    { label: "+ Ajouter", href: "/pets/new" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { router.push("/login"); return; }
    getPets(token)
      .then(setPets)
      .catch(() => setError("Impossible de charger les mascottes — Django est lancé ?"))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="min-h-screen bg-pastel-bg text-pastel-text flex flex-col">
      <Navbar tabs={tabs} isOpen={isOpen} onToggle={() => setIsOpen(o => !o)} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Mes mascottes</h1>
            <p className="text-pastel-muted text-sm mt-1">
              {pets.length} mascotte{pets.length !== 1 ? "s" : ""} enregistrée{pets.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 rounded-lg border border-pastel-border text-pastel-muted text-sm hover:bg-pastel-surface transition"
            >
              ← Dashboard
            </button>
            <button
              onClick={() => router.push("/pets/new")}
              className="px-4 py-2 bg-pastel-primary text-white rounded-lg shadow text-sm font-semibold hover:opacity-90 transition"
            >
              + Ajouter
            </button>
          </div>
        </div>

        {error && (
          <p className="mb-6 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-pastel-muted text-center py-20">Chargement…</p>
        ) : pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-pastel-surface rounded-2xl border border-pastel-border shadow">
            <p className="text-pastel-muted mb-4">Aucune mascotte pour l'instant.</p>
            <button
              onClick={() => router.push("/pets/new")}
              className="px-6 py-2 bg-pastel-primary text-white rounded-lg shadow hover:opacity-90 transition"
            >
              Ajouter ma première mascotte →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pets.map(pet => (
              <div
                key={pet.id}
                onClick={() => router.push(`/pets/${pet.id}`)}
                className="bg-white rounded-2xl border border-pastel-border shadow hover:shadow-md transition cursor-pointer overflow-hidden"
              >
                <div className="w-full h-44 bg-pastel-surface flex items-center justify-center overflow-hidden">
                  {pet.picture
                    ? <img src={`${MEDIA}${pet.picture}`} alt={pet.name} className="w-full h-full object-cover" />
                    : <span className="text-5xl">🐾</span>}
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-lg">{pet.name}</h2>
                  <p className="text-sm text-pastel-muted">{pet.category?.name ?? "—"}</p>
                  {pet.birth_date && <p className="text-sm text-pastel-muted">{pet.birth_date}</p>}
                  <span className="inline-block mt-3 text-xs bg-pastel-bg text-pastel-primary font-semibold px-3 py-1 rounded-full border border-pastel-border">
                    {pet.vaccinations?.length ?? 0} vaccination{(pet.vaccinations?.length ?? 0) !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
