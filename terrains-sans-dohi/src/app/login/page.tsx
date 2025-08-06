
"use client"
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // TODO: call API to login
    setError("");
    alert(`Connexion avec email: ${email}`);
  };

  return (
    <div className="flex flex-col my-20">
  <form
    onSubmit={handleSubmit}
    className="place-self-center
      max-w-md w-full p-8 rounded-xl
      bg-white bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-60
      backdrop-blur-md
      shadow-xl
      border border-gray-200 dark:border-gray-700
      transition-colors duration-500
    "
  >
      <h2 className="text-2xl font-bold mb-6 text-center">Se connecter</h2>

      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <label className="block mb-2 font-semibold" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="exemple@domaine.com"
        required
      />

      <label className="block mb-2 font-semibold" htmlFor="password">
        Mot de passe
      </label>
      <input
        id="password"
        type="password"
        className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Votre mot de passe"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        Connexion
      </button>
    </form>
    </div>
  );
}
