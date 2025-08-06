
"use client";
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <nav className="shadow-md sticky top-0 z-50 rounded-md outline-2">
            <div className="flex bg-[var(--background)] max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text max-w-2xl font-bold whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-white">
                    <Link href="/">T100D</Link>
                </h1>
        <ul className="hidden md:flex space-x-6 ml-6 ">
          <li><Link href="/" className="hover:underline text-[var(--foreground)]">Accueil</Link></li>
          <li><Link href="/catalogue" className="hover:underline">Catalogue</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>
        
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700" onClick={() => setProfileOpen(!profileOpen)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5z"
                            clipRule="evenodd"
                        />
                    </svg>

                </button>
                {/* Dropdown Menu */}
                {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 flex flex-col items-stretch space-y-2  border rounded-lg shadow-lg p-2 w-40 z-100">
                        <Link
                            href="/login"
                            className="text-center  px-4 py-2  hover:underline hover:cursor transition"
                        >
                            Se connecter
                        </Link>
                        <Link
                            href="/signup"
                            className="text-center text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            S'inscrire
                        </Link>
                    </div>
                )}
                
            <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-4 focus:outline-none"
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
      </div>

      {/* Mobile Menu with Search Bar */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--orange-custom)] px-6 pb-4 space-y-4">
          <Link href="/home" className="block py-2 hover:underline" onClick={() => setMenuOpen(!menuOpen)}>Accueil</Link>
          <Link href="/catalogue" className="block py-2 hover:underline" onClick={() => setMenuOpen(!menuOpen)}>Catalogue</Link>
          <Link href="/contact" className="block py-2 hover:underline" onClick={() => setMenuOpen(!menuOpen)}>Contact</Link>
    
        </div>
      )}

            
        </nav>
    )
}
