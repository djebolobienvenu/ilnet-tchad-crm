"use client";

import React from "react";
import Link from "next/link";
import Reveal from "@/components/ilnet/Reveal";
import AnimatedCounter from "@/components/ilnet/AnimatedCounter";
import { IconFiabilite, IconInnovation, IconTransparence, IconAccessibilite } from "@/components/ilnet/ValeurIcons";

const valeurs = [
  { icon: <IconFiabilite />, titre: "Fiabilité" },
  { icon: <IconInnovation />, titre: "Innovation" },
  { icon: <IconTransparence />, titre: "Transparence" },
  { icon: <IconAccessibilite />, titre: "Accessibilité" },
];

const offresDuMoment = [
  {
    titre: "Routeur à 30 000 F + 30 Go",
    sousTitre: "valable 01 mois",
    texte: "Du wifi haut débit pour votre maison ou votre bureau.",
    icon: "📶",
  },
  {
    titre: "Fibre Optique domicile",
    sousTitre: "à partir de 25 000 franc",
    texte: "Internet illimité + télévision HD.",
    icon: "🏠",
  },
];

const pourquoiNousChoisir = [
  { icon: "💼", titre: "Qualité", texte: "Des solutions fiables et durables, conçues pour offrir la meilleure expérience à chaque client." },
  { icon: "🤝", titre: "Disponibilité", texte: "Un service accessible 24h/24 et 7j/7, toujours prêt à répondre à vos besoins." },
  { icon: "💬", titre: "Performance", texte: "Des technologies puissantes pour une meilleure satisfaction de vos attentes." },
];

const statistiques = [
  { valeur: 99.99, decimales: 2, suffixe: "%", libelle: "Satisfaction" },
  { valeur: 99.9, decimales: 1, suffixe: "%", libelle: "Qualité" },
  { valeur: 99.9, decimales: 1, suffixe: "%", libelle: "Équipe" },
  { valeur: 99.99, decimales: 2, suffixe: "%", libelle: "Solution" },
];

export default function IlnetHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            ILNET <span className="text-orange-500">TELECOM</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Leader des FAI et de la télédistribution au Tchad.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/service"
              className="bg-white border border-blue-200 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 hover:scale-105 transition-all shadow-sm"
            >
              Nos Services →
            </Link>
            <Link
              href="/inscription"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all"
            >
              Créer mon compte →
            </Link>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {valeurs.map((v, i) => (
            <Reveal key={v.titre} delai={i * 100} className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-orange-50 flex items-center justify-center p-4">
                {v.icon}
              </div>
              <p className="font-semibold text-gray-800">{v.titre}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Offres du moment (teaser -> renvoie vers la page /offres) */}
      <section className="bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <Reveal className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Offres du moment</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offresDuMoment.map((o, i) => (
              <Reveal key={o.titre} delai={i * 120}>
                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-5 hover:shadow-lg transition-shadow duration-300">
                  <span className="text-5xl">{o.icon}</span>
                  <div className="flex-1">
                    <p className="text-orange-600 font-bold leading-snug">{o.titre}</p>
                    <p className="text-orange-500 text-sm font-medium mb-1">{o.sousTitre}</p>
                    <p className="text-sm text-gray-500 mb-3">{o.texte}</p>
                    <Link
                      href="/offres"
                      className="inline-block bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                    >
                      Plus d&apos;infos
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/offres"
              className="inline-block bg-white border border-orange-300 text-orange-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-50 transition"
            >
              Voir toutes nos offres →
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <Reveal className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800">Pourquoi nous choisir ?</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {pourquoiNousChoisir.map((p, i) => (
              <Reveal key={p.titre} delai={i * 120}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">{p.titre}</p>
                    <p className="text-sm text-gray-500">{p.texte}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="bg-orange-500">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {statistiques.map((s, i) => (
            <Reveal key={s.libelle} delai={i * 100}>
              <div className="bg-orange-600/40 rounded-lg py-6">
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  <AnimatedCounter cible={s.valeur} suffixe={s.suffixe} decimales={s.decimales} />
                </p>
                <p className="text-orange-50 text-sm mt-1">{s.libelle}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }

        @keyframes blobMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.35;
          animation: blobMove 14s ease-in-out infinite;
        }
        .blob-1 { width: 380px; height: 380px; background: #fb923c; top: -100px; left: -100px; }
        .blob-2 { width: 320px; height: 320px; background: #60a5fa; bottom: -100px; right: -80px; animation-delay: 4s; }
      `}</style>
    </>
  );
}
