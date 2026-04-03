export default function HeroSection() {
  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-pastel-bg to-pastel-surface py-16">
      <div className="flex flex-col items-center justify-between w-full md:w-[48%] md:min-h-[650px] p-8 bg-pastel-surface rounded-2xl shadow-lg border border-pastel-border">
        <h1 className="text-3xl font-bold">Alice & les chats</h1>

        <p className="text-pastel-muted text-center mt-4">
          Alice est une passionnée des animaux et adore créer un coin cosy où chaque
          mascotte peut être découverte en un clin d’oeil. Ici, tu retrouves un
          catalogue de mascottes avec leurs fiches : leur nom, leur catégorie et
          leurs informations pour mieux faire connaissance. Et parce que la santé
          compte, tu peux aussi suivre leurs vaccinations et leurs rappels afin de
          garder toutes ces petites boules de poils en pleine forme, tout en
          organisant le suivi au même endroit.
        </p>

        <button className="mt-6 px-6 py-2 bg-pastel-primary text-white rounded-lg shadow hover:opacity-90">
          Découvrir
        </button>
      </div>
    </div>
  );
}

