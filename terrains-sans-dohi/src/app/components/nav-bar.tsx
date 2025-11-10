"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/user-context";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userContext = useUser();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Close profile dropdown if clicking outside
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setProfileOpen(false);
      }
      
      // Close mobile menu if clicking outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navigationLinks = [
    { href: "/", label: "Accueil" },
    { href: "/browse", label: "Parcourir" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/contact", label: "Contact" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const closeProfileMenu = () => setProfileOpen(false);

  const getUserInitials = () => {
    const firstName = userContext?.user?.firstName || "";
    const lastName = userContext?.user?.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";
  };

  return (
    <>
      <nav className="bg-[var(--background)] shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-1"
              >
                <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 flex-shrink-0">
                  <defs>
                    <linearGradient id="secureTerrainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: '#059669', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#047857', stopOpacity: 1}} />
                    </linearGradient>
                    
                    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 1}} />
                    </linearGradient>
                    
                    <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                      <feOffset dx="1" dy="1" result="offset"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.2"/>
                      </feComponentTransfer>
                      <feMerge> 
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/> 
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <g transform="translate(40, 35)">
                    <rect x="-25" y="5" width="50" height="25" rx="2" 
                          fill="url(#secureTerrainGradient)" 
                          filter="url(#softShadow)"/>
                    
                    <rect x="-25" y="5" width="50" height="25" rx="2" 
                          fill="none" 
                          stroke="#047857" 
                          strokeWidth="1.5" 
                          strokeDasharray="2,1"/>
                    
                    <path d="M0 -30 L18 -25 L18 -5 Q18 0 13 5 L0 10 L-13 5 Q-18 0 -18 -5 L-18 -25 Z" 
                          fill="url(#shieldGradient)" 
                          filter="url(#softShadow)"/>
                    
                    <path d="M-7 -10 L-3 -6 L8 -17" 
                          stroke="#ffffff" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          fill="none"/>
                    
                    <rect x="-6" y="15" width="12" height="8" fill="#dc2626"/>
                    <path d="M-8 15 L0 10 L8 15 Z" fill="#991b1b"/>
                    
                    <text x="0" y="38" 
                          fontFamily="Arial, sans-serif" 
                          fontSize="6" 
                          fontWeight="600" 
                          fill="#047857" 
                          textAnchor="middle" 
                          opacity="0.8">TsD</text>
                  </g>
                </svg>
                <div className="hidden md:flex flex-col">
                  <span className="text-lg font-bold text-[var(--foreground)] leading-tight">
                    Terrains Sans Dohi
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                    Terrains sécurisés
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-6">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--foreground)] hover:text-red-500 transition-colors duration-200 font-medium focus:outline-none focus:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Desktop Auth Section */}
              {!userContext?.isLoggedIn ? (
                <div className="flex items-center space-x-3 ml-6">
                  <Link
                    href="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium focus:outline-none focus:underline"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                <div className="relative ml-6" ref={profileDropdownRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-expanded={profileOpen}
                    aria-label="Menu du profil"
                  >
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {getUserInitials()}
                    </div>
                    <span className="text-[var(--foreground)] font-medium">
                      {userContext.user?.firstName || "Utilisateur"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-[var(--foreground)] transition-transform duration-200 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 py-1">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {userContext.user?.firstName} {userContext.user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {userContext.user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={closeProfileMenu}
                      >
                        Mon Profil
                      </Link>
                      {userContext.user?.role === "SELLER" && (
                        <Link
                          href="/seller/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={closeProfileMenu}
                        >
                          Tableau de bord vendeur
                        </Link>
                      )}
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={closeProfileMenu}
                      >
                        Paramètres
                      </Link>
                      <hr className="border-gray-200 dark:border-gray-700 my-1" />
                      <button
                        onClick={() => {
                          userContext.logout();
                          closeProfileMenu();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden" ref={mobileMenuRef}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Menu de navigation"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={closeMobileMenu} />
          <div className="relative flex flex-col w-full max-w-sm ml-auto h-full bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 flex-shrink-0">
                  <defs>
                    <linearGradient id="secureTerrainGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: '#059669', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#047857', stopOpacity: 1}} />
                    </linearGradient>
                    
                    <linearGradient id="shieldGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 1}} />
                    </linearGradient>
                    
                    <filter id="softShadowMobile" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                      <feOffset dx="1" dy="1" result="offset"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.2"/>
                      </feComponentTransfer>
                      <feMerge> 
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/> 
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <g transform="translate(40, 35)">
                    <rect x="-25" y="5" width="50" height="25" rx="2" 
                          fill="url(#secureTerrainGradientMobile)" 
                          filter="url(#softShadowMobile)"/>
                    
                    <rect x="-25" y="5" width="50" height="25" rx="2" 
                          fill="none" 
                          stroke="#047857" 
                          strokeWidth="1.5" 
                          strokeDasharray="2,1"/>
                    
                    <path d="M0 -30 L18 -25 L18 -5 Q18 0 13 5 L0 10 L-13 5 Q-18 0 -18 -5 L-18 -25 Z" 
                          fill="url(#shieldGradientMobile)" 
                          filter="url(#softShadowMobile)"/>
                    
                    <path d="M-7 -10 L-3 -6 L8 -17" 
                          stroke="#ffffff" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          fill="none"/>
                    
                    <rect x="-6" y="15" width="12" height="8" fill="#dc2626"/>
                    <path d="M-8 15 L0 10 L8 15 Z" fill="#991b1b"/>
                    
                    <text x="0" y="38" 
                          fontFamily="Arial, sans-serif" 
                          fontSize="6" 
                          fontWeight="600" 
                          fill="#047857" 
                          textAnchor="middle" 
                          opacity="0.8">TsD</text>
                  </g>
                </svg>
                <span className="text-lg font-semibold text-[var(--foreground)]">Terrains Sans Dohi</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Fermer le menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Links */}
              <div className="px-4 py-4 space-y-1">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 rounded-lg text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4">
                {!userContext?.isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="block w-full px-3 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Se connecter
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full px-3 py-2 text-center rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium transition-colors"
                      onClick={closeMobileMenu}
                    >
                      S'inscrire
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">
                          {userContext.user?.firstName} {userContext.user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {userContext.user?.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-lg text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Mon Profil
                    </Link>
                    {userContext.user?.role === "SELLER" && (
                      <Link
                        href="/seller/dashboard"
                        className="block px-3 py-2 rounded-lg text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Tableau de bord vendeur
                      </Link>
                    )}
                    <Link
                      href="/settings"
                      className="block px-3 py-2 rounded-lg text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Paramètres
                    </Link>
                    <button
                      onClick={() => {
                        userContext.logout();
                        closeMobileMenu();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}