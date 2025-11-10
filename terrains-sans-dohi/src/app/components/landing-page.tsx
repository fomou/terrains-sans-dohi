"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const userContext = useUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userContext?.isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    // TODO: Implement search functionality for logged-in users
    router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!userContext?.isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    router.push('/browse');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 relative z-10">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Plateforme sécurisée
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Trouvez le terrain idéal pour investir
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                    Découvrez des terrains vérifiés partout dans le pays. Des retraites rurales aux opportunités commerciales, tout en toute sécurité.
                  </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Localisation, ville, ou code postal..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
                    />
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-red-600/25"
                  >
                    Rechercher
                  </button>
                </form>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBrowseClick}
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    Parcourir tous les terrains
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  {!userContext?.isLoggedIn && (
                    <button
                      onClick={handleSignUp}
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-600/25"
                    >
                      Commencer gratuitement
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Features List */}
                <div className="flex flex-col sm:flex-row gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Propriétés vérifiées</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Transactions sécurisées</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Support d'experts</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative">
                <div className="w-full h-80 md:h-96 lg:h-[500px] relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl shadow-black/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img
                    src="/hero.jpg"
                    alt="Terrain sécurisé avec vue panoramique"
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400' viewBox='0 0 500 400'%3E%3Crect width='500' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%239CA3AF' text-anchor='middle' dy='0.35em'%3ETerrain d'exemple%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                      <p className="text-white font-semibold">Terrain sécurisé disponible</p>
                      <p className="text-gray-300 text-sm">À partir de 50,000 FCFA/m²</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Pourquoi choisir Terrains Sans Dohi
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Nous simplifions l'achat et la vente de terrains : simple, sécurisé et transparent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Advanced Search */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-600/25">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Recherche avancée</h3>
                <p className="text-gray-300 leading-relaxed">
                  Trouvez exactement ce que vous recherchez grâce à notre système de filtres puissant et intuitif.
                </p>
              </div>

              {/* Verified Listings */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-600/25">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Annonces vérifiées</h3>
                <p className="text-gray-300 leading-relaxed">
                  Toutes les propriétés sont rigoureusement vérifiées pour leur authenticité et leur conformité légale.
                </p>
              </div>

              {/* Expert Support */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-600/25">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Support d'experts</h3>
                <p className="text-gray-300 leading-relaxed">
                  Bénéficiez des conseils de notre équipe de professionnels de l'investissement foncier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!userContext?.isLoggedIn && (
          <section className="py-16 relative">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="bg-gradient-to-r from-red-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Prêt à commencer ?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Rejoignez des milliers d'investisseurs qui font confiance à notre plateforme pour leurs achats de terrains.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleSignUp}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-red-600/25"
                  >
                    Créer un compte gratuit
                  </button>
                  <button
                    onClick={handleSignIn}
                    className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                  >
                    Se connecter
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Auth Required Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Connexion requise
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Vous devez créer un compte ou vous connecter pour accéder aux terrains disponibles.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSignUp}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Créer un compte
                </button>
                <button
                  onClick={handleSignIn}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Se connecter
                </button>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}