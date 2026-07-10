"use client";

import React, { useState } from "react";

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

const offres = [
  {
    id: "fibre50",
    nom: "Fibre 50 Mbps",
    prix: "15 000",
    debit: "50 Mbps",
    description: "Idéal pour un usage quotidien : navigation, streaming, télétravail léger.",
    couleur: "border-blue-500",
  },
  {
    id: "fibre100",
    nom: "Fibre 100 Mbps",
    prix: "25 000",
    debit: "100 Mbps",
    description: "Pour les familles connectées : plusieurs appareils, streaming HD/4K.",
    couleur: "border-orange-500",
    populaire: true,
  },
  {
    id: "fibre200",
    nom: "Fibre 200 Mbps",
    prix: "40 000",
    debit: "200 Mbps",
    description: "Pour les professionnels et gros usages : visioconférence, cloud, gaming.",
    couleur: "border-purple-500",
  },
  {
    id: "4g20",
    nom: "4G 20 Go",
    prix: "10 000",
    debit: "20 Go / mois",
    description: "Solution mobile flexible, sans engagement, idéale en complément.",
    couleur: "border-green-500",
  },
];

export default function OffresPage() {
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleSouscrire = (offreNom: string, prix: string) => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return;
    const user: SessionUser = JSON.parse(rawUser);

    const requests = JSON.parse(
      localStorage.getItem("ilnet_client_subscriptions") || "[]"
    );

    requests.push({
      id: "sub" + Date.now(),
      clientEmail: user.email,
      clientName: user.name,
      offre: offreNom,
      prix: `${prix} FCFA`,
      statut: "En attente de validation",
      dateDemande: new Date().toISOString(),
    });

    localStorage.setItem("ilnet_client_subscriptions", JSON.stringify(requests));
    setConfirmation(offreNom);
    setTimeout(() => setConfirmation(null), 4000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">🎁 Nos offres</h1>
      <p className="text-gray-500 mb-6">
        Choisissez l&apos;offre qui correspond à vos besoins.
      </p>

      {confirmation && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
          ✅ Votre demande de souscription à l&apos;offre <strong>{confirmation}</strong> a
          bien été envoyée. Un agent ILNET-TCHAD va la valider prochainement.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {offres.map((offre) => (
          <div
            key={offre.id}
            className={`relative bg-white rounded-lg shadow p-6 border-t-4 ${offre.couleur} flex flex-col`}
          >
            {offre.populaire && (
              <span className="absolute -top-3 right-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                Populaire
              </span>
            )}
            <p className="font-semibold text-gray-800 text-lg">{offre.nom}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {offre.prix}{" "}
              <span className="text-sm font-normal text-gray-500">FCFA / mois</span>
            </p>
            <p className="text-sm text-blue-600 font-medium mt-1">{offre.debit}</p>
            <p className="text-sm text-gray-500 mt-3 flex-1">{offre.description}</p>
            <button
              onClick={() => handleSouscrire(offre.nom, offre.prix)}
              className="mt-5 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Souscrire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
