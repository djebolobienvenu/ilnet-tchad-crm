"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

export default function EspaceClientHome() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Bonjour {firstName} 👋
        </h1>
        <p className="text-gray-500">
          Bienvenue sur votre espace client ILNET-TCHAD.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Link
          href="/espace-client/abonnement"
          className="bg-white p-5 rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-600"
        >
          <p className="text-2xl mb-2">📡</p>
          <p className="font-semibold text-gray-800">Mon abonnement</p>
          <p className="text-sm text-gray-500">Voir mon offre actuelle</p>
        </Link>

        <Link
          href="/espace-client/offres"
          className="bg-white p-5 rounded-lg shadow hover:shadow-md transition border-l-4 border-orange-500"
        >
          <p className="text-2xl mb-2">🎁</p>
          <p className="font-semibold text-gray-800">Nos offres</p>
          <p className="text-sm text-gray-500">Découvrir nos forfaits</p>
        </Link>

        <Link
          href="/espace-client/assistant"
          className="bg-white p-5 rounded-lg shadow hover:shadow-md transition border-l-4 border-green-600"
        >
          <p className="text-2xl mb-2">🤖</p>
          <p className="font-semibold text-gray-800">Assistant IA</p>
          <p className="text-sm text-gray-500">Besoin d&apos;aide ?</p>
        </Link>

        <Link
          href="/espace-client/profil"
          className="bg-white p-5 rounded-lg shadow hover:shadow-md transition border-l-4 border-gray-400"
        >
          <p className="text-2xl mb-2">👤</p>
          <p className="font-semibold text-gray-800">Mon profil</p>
          <p className="text-sm text-gray-500">Gérer mes informations</p>
        </Link>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-800">
            Un problème avec votre connexion ?
          </p>
          <p className="text-sm text-gray-600">
            Notre assistant IA peut vous aider immédiatement, 24h/24.
          </p>
        </div>
        <Link
          href="/espace-client/assistant"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap"
        >
          Discuter maintenant
        </Link>
      </div>
    </div>
  );
}
