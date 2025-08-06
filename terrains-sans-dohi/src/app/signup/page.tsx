"use client";
import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // TODO: call API to register
    setError("");
    alert(`Inscription avec email: ${email}`);
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
    <h2 className="text-2xl font-bold mb-6 text-center">S'inscrire</h2>

    {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

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
      className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Votre mot de passe"
      required
    />

    <label className="block mb-2 font-semibold" htmlFor="confirmPassword">
      Confirmer le mot de passe
    </label>
    <input
      id="confirmPassword"
      type="password"
      className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirmez votre mot de passe"
      required
    />

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
    >
      S'inscrire
    </button>
  </form>
</div>
  )
}
