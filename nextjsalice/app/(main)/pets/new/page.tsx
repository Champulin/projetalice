"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPet } from "../../../lib/api/pets";
import { getCategories, Category } from "../../../lib/api/categories";
import Navbar from "../../../components/home/Navbar";
import Footer from "../../../components/home/Footer";

export default function NewPetPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category_id: "", birth_date: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const tabs = [
    { label: "← Accueil", href: "/" },
    { label: "Mes mascottes", href: "/pets" },
    { label: "+ Ajouter", href: "/pets/new" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { router.push("/login"); return; }
    getCategories(token).then(setCategories).catch(() => {});
  }, [router]);

  function setField(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const token = localStorage.getItem("access_token");
    if (!token) { router.push("/login"); return; }

    const data = new FormData();
    data.append("name", form.name);
    data.append("category_id", form.category_id);
    if (form.birth_date) data.append("birth_date", form.birth_date);
    if (fileRef.current?.files?.[0]) data.append("picture", fileRef.current.files[0]);

    setLoading(true);
    try {
      const pet = await createPet(data, token);
      router.push(`/pets/${pet.id}`);
    } catch (err: unknown) {
      if (err && typeof err === "object") setErrors(err as Record<string, string[]>);
      else setErrors({ non_field_errors: ["Une erreur s'est produite."] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pastel-bg text-pastel-text flex flex-col">
      <Navbar tabs={tabs} isOpen={isOpen} onToggle={() => setIsOpen(o => !o)} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-pastel-surface rounded-2xl shadow-lg border border-pastel-border p-8">
          <button
            onClick={() => router.push("/pets")}
            className="text-sm text-pastel-muted hover:text-pastel-text mb-5 block"
          >
            ← Mes mascottes
          </button>

          <h1 className="text-2xl font-bold mb-1">Ajouter une mascotte</h1>
          <p className="text-pastel-muted text-sm mb-6">Remplis les informations ci-dessous</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Photo upload */}
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full h-40 rounded-xl border-2 border-dashed border-pastel-border bg-pastel-bg flex items-center justify-center cursor-pointer overflow-hidden hover:border-pastel-primary transition"
            >
              {preview
                ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                : <span className="text-pastel-muted text-sm">Clique pour ajouter une photo</span>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">Nom</label>
              <input
                className={`w-full px-4 py-2.5 rounded-lg border bg-white text-pastel-text focus:outline-none focus:ring-2 focus:ring-pastel-primary/40 ${errors.name ? "border-red-400" : "border-pastel-border"}`}
                type="text"
                placeholder="Max"
                value={form.name}
                onChange={e => setField("name", e.target.value)}
                required
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name[0]}</span>}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">Catégorie</label>
              <select
                className={`w-full px-4 py-2.5 rounded-lg border bg-white text-pastel-text focus:outline-none focus:ring-2 focus:ring-pastel-primary/40 ${errors.category_id ? "border-red-400" : "border-pastel-border"}`}
                value={form.category_id}
                onChange={e => setField("category_id", e.target.value)}
                required
              >
                <option value="">Sélectionner…</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.category_id && <span className="text-xs text-red-500">{errors.category_id[0]}</span>}
            </div>

            {/* Birth date */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">
                Date de naissance <span className="text-pastel-border font-normal">(optionnel)</span>
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-pastel-border bg-white text-pastel-text focus:outline-none focus:ring-2 focus:ring-pastel-primary/40"
                type="date"
                value={form.birth_date}
                onChange={e => setField("birth_date", e.target.value)}
              />
            </div>

            {errors.non_field_errors && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {errors.non_field_errors[0]}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-pastel-primary text-white rounded-lg font-semibold shadow hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Enregistrement…" : "Ajouter la mascotte →"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
