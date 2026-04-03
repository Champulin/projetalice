import Image from "next/image";
import type { Pet } from "@/app/lib/api/pets";

type PetCardProps = {
  pet: Pet;
};

export default function PetCard({ pet }: PetCardProps) {
  const categoryLabel =
    typeof pet.category === "number" ? `#${pet.category}` : pet.category.name;

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-pastel-border">
      <h2 className="font-semibold text-lg">{pet.name}</h2>

      <p className="text-sm text-pastel-muted">Catégorie: {categoryLabel}</p>

      {pet.picture && (
        <div className="mt-2 w-full h-40 relative">
          <img
            src={pet.picture}
            alt={pet.name}
            width={100}
            height={100}
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

