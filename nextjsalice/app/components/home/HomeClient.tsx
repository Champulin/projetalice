"use client";

import { useEffect, useState } from "react";
import { getPets, type Pet } from "@/app/lib/api/pets";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import PetsSection from "./PetsSection";
import Footer from "./Footer";

export default function HomeClient() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const tabs = ["Accueil", "À propos", "Mes mascottes", "Contactez-moi"];

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="bg-pastel-bg min-h-screen text-pastel-text">
      <Navbar tabs={tabs} isOpen={isOpen} onToggle={() => setIsOpen((p) => !p)} />
      <HeroSection />
      <PetsSection pets={pets} loading={loading} />
      <Footer />
    </div>
  );
}

