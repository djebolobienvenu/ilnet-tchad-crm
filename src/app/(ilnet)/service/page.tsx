"use client";

import React from "react";
import Link from "next/link";

const services = [
  {
    icon: "🌐",
    titre: "Internet Fibre optique",
    texte:
      "Une connexion stable et rapide pour la maison ou le bureau, avec plusieurs paliers de débit selon vos besoins.",
  },
  {
    icon: "📶",
    titre: "Internet Mobile 4G",
    texte:
      "Une solution flexible et sans installation, idéale en complément ou pour les zones non couvertes par la fibre.",
  },
  {
    icon: "🎧",
    titre: "Support technique 24h/24",
    texte:
      "Une équipe d'agents disponible pour résoudre vos pannes, questions de facturation ou toute autre demande.",
  },
  {
    icon: "🤖",
    titre: "Assistant IA",
    texte:
      "Un premier niveau de réponse instantané, disponible à tout moment, capable d'ouvrir un ticket automatiquement si besoin.",
  },
  {
    icon: "🛠️",
    titre: "Installation & maintenance",
    texte:
      "Nos techniciens interviennent chez vous pour l'installation initiale et l'entretien de votre équipement.",
  },
  {
    icon: "📱",
    titre: "Espace client en ligne",
    texte:
      "Suivez votre abonnement, vos factures et vos tickets de support depuis votre espace personnel, à tout moment.",
  },
];

export default function ServicePage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Nos services</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          ILNET-TCHAD accompagne particuliers et professionnels avec une offre
          complète, du raccordement à l&apos;assistance quotidienne.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.titre} className="bg-white rounded-lg shadow p-6">
              <span className="text-3xl mb-3 inline-block">{s.icon}</span>
              <p className="font-semibold text-gray-800 mb-2">{s.titre}</p>
              <p className="text-sm text-gray-500">{s.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Une question sur nos services ?
          </h2>
          <p className="text-gray-500 mb-6">
            Notre équipe est disponible pour vous conseiller sur l&apos;offre la plus adaptée.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Nous contacter
            </Link>
            <Link
              href="/#offres"
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Voir nos offres
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
