import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-20 opacity-150">
      {/* Row 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Column 1: Text */}
        <div>
          <h1 className="text-5xl font-extrabold text-[var(--foreground)] mb-6">
            Trouver le terrains parfait
          </h1>
          <p className="text-lg text-[var(--foreground) max-w-md">
            Découvrer les terrains dûment vérifiés partout à travers le pays.
          </p>
        </div>

        {/* Column 2: Image */}
        <div className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/property.jpg" // Put your image path here
            alt="Image d'une propriété"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Row 2 */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[var(--foreground) mb-3">
          Pourquoi choisir terrains sans dohi
        </h2>
        <p className="text-gray-700 mb-10">
          Nous rendons vos achats de terrains simple et sécuritaire
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2">Recherche avancée</h3>
            <p className="text-gray-600">
              Trouvez rapidement les terrains qui correspondent à vos critères.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2">Liste vérifiée</h3>
            <p className="text-[var(--foreground)">
              Chaque terrain est soigneusement contrôlé et validé.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2">Support des experts</h3>
            <p className="text-gray-600">
              Notre équipe vous accompagne tout au long de votre achat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
