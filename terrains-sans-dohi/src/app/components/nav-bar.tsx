"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/user-context";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userContext = useUser(); // Assuming useUser is a custom hook to access user context

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[var(--background)] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="font-bold whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-white">
            <Link href="/">T100D</Link>
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 ml-6">
            <li>
              <Link href="/" className="hover:underline text-[var(--foreground)] transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/browse" className="hover:underline text-[var(--foreground)] transition-colors">
                Parcourir
              </Link>
            </li>
            <li>
              <Link href="/catalogue" className="hover:underline text-[var(--foreground)] transition-colors">
                Catalogue
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline text-[var(--foreground)] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
          {!userContext?.isLoggedIn && (
            <div className="flex items-center space-x-4">
              {/* TODO : No user context, always show login/signup  */}
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  href="/signup"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  S&apos;inscrire
                </Link>
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
                aria-expanded={menuOpen}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>)}

          {userContext?.isLoggedIn && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
                aria-expanded={profileOpen}
                aria-label="Toggle profile menu"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                  {userContext.user?.firstName ? userContext.user.firstName.charAt(0).toUpperCase() : "U"}{userContext.user?.lastName ? userContext.user.lastName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="hidden md:block text-[var(--foreground)]">{userContext.user?.firstName || "User"}</span>
                <svg className="w-4 h-4 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    Mon Profil
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    Paramètres
                  </Link>
                  <button
                    onClick={() => {
                      userContext.logout();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}

            </div>)}

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                  href="/"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  href="/browse"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Parcourir
                </Link>
                <Link
                  href="/catalogue"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Catalogue
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/login"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  S&apos;inscrire
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
