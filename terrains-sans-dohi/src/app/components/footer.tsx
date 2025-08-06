export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-xl font-bold mb-2">Terrains100Dohi</h3>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Terrains100Dohi. Tous droits réservés.
          </p>
        </div>

        {/* Center */}
        <nav className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-white transition">
            Accueil
          </a>
          <a href="#" className="hover:text-white transition">
            À propos
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
          <a href="#" className="hover:text-white transition">
            FAQ
          </a>
        </nav>

        {/* Right */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="hover:text-white transition">
            {/* Facebook SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M22 12a10 10 0 10-11.62 9.86v-6.98h-2.3v-2.88h2.3V9.41c0-2.27 1.35-3.52 3.43-3.52.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.88h-2.1v6.98A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white transition">
            {/* Twitter SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.18 9.18 0 01-2.83 1.08 4.5 4.5 0 00-7.66 4.1A12.79 12.79 0 013 4.9a4.5 4.5 0 001.4 6 4.48 4.48 0 01-2.05-.57v.06a4.5 4.5 0 003.6 4.42 4.52 4.52 0 01-2.04.08 4.5 4.5 0 004.2 3.13A9 9 0 013 19.54 12.73 12.73 0 009 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.18 8.18 0 0023 3z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-white transition">
            {/* Instagram SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.75 2.5a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
