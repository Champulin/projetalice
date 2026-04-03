import type { Pet } from "@/app/lib/api/pets";
import PetCard from "./PetCard";

type PetsSectionProps = {
  pets: Pet[];
  loading: boolean;
};

export default function PetsSection({ pets, loading }: PetsSectionProps) {
  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="bg-pastel-secondary/20 px-8 py-6 rounded-xl shadow border border-pastel-border">
        <h1 className="text-2xl font-bold mb-4">Mes mascottes</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

