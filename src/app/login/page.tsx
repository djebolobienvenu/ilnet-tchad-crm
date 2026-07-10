"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulation de connexion (plus tard avec API)
    setTimeout(() => {
      if (email === "admin@ilnet.com" && password === "admin123") {
        localStorage.setItem("user", JSON.stringify({ 
          email, 
          role: "admin", 
          name: "Administrateur" 
        }));
        router.push("/");
      } else if (email === "agent@ilnet.com" && password === "agent123") {
        localStorage.setItem("user", JSON.stringify({ 
          email, 
          role: "agent", 
          name: "Agent Support" 
        }));
        router.push("/");
      } else {
        // Vérifier parmi les comptes clients créés via /inscription
        const clients: { name: string; email: string; password: string }[] =
          JSON.parse(localStorage.getItem("ilnet_clients") || "[]");
        const client = clients.find(
          (c) => c.email === email && c.password === password
        );

        if (client) {
          localStorage.setItem(
            "user",
            JSON.stringify({ email, role: "client", name: client.name })
          );
          router.push("/espace-client");
        } else {
          setError("Email ou mot de passe incorrect");
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo/ilnet-logo.png"
            alt="ILNET-TCHAD"
            width={200}
            height={141}
            className="mx-auto h-20 w-auto"
            priority
          />
          <p className="text-gray-500 text-sm mt-2">Plateforme CRM & Support</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">🔐 Connexion</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="admin@ilnet.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Test : admin@ilnet.com / admin123</p>
          <p className="text-xs mt-1">agent@ilnet.com / agent123</p>
        </div>

        <div className="mt-4 text-center text-sm border-t pt-4">
          <p className="text-gray-500">
            Vous êtes client ILNET-TCHAD ?{" "}
            <Link href="/inscription" className="text-blue-600 hover:underline font-medium">
              Créer mon compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}