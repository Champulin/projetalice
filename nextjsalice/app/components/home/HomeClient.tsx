"use client";

import { useEffect, useState } from "react";
import { getPets, type Pet } from "@/app/lib/api/pets";
import { useAuth } from "@/app/lib/hooks/useAuth";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import PetsSection from "./PetsSection";
import Footer from "./Footer";

export default function HomeClient() {
  const token = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { label: "Accueil", href: "/" },
    { label: "Mes mascottes", href: "/pets" },
    { label: "+ Ajouter", href: "/pets/new" },
  ];

  useEffect(() => {
    if (!token) return;
    getPets(token)
      .then(setPets)
      .catch(err => console.error("Error fetching pets:", err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="bg-pastel-bg min-h-screen text-pastel-text">
      <Navbar tabs={tabs} isOpen={isOpen} onToggle={() => setIsOpen((p) => !p)} />
      <HeroSection />
      <PetsSection pets={pets} loading={loading} />
      <Footer />
    </div>
  );
}

