"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const slides = [
  {
    emoji: "📡",
    titre: "Gérez vos abonnements en ligne",
    texte: "Fibre, 4G, forfaits sur-mesure : souscrivez et suivez votre offre en quelques clics.",
    gradient: "from-blue-600 to-blue-400",
  },
  {
    emoji: "🎫",
    titre: "Un support réactif, à portée de main",
    texte: "Ouvrez un ticket, échangez avec un agent, suivez la résolution en temps réel.",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    emoji: "🤖",
    titre: "Assistant IA disponible 24h/24",
    texte: "Panne, facturation, question sur votre offre : une réponse immédiate, jour et nuit.",
    gradient: "from-emerald-600 to-teal-400",
  },
  {
    emoji: "👥",
    titre: "Toute la relation client, un seul endroit",
    texte: "Une plateforme pensée pour ILNET-TCHAD : clients, agents et administrateurs réunis.",
    gradient: "from-violet-600 to-purple-400",
  },
];

const fonctionnalites = [
  { icon: "📡", titre: "Offres flexibles", texte: "Fibre et 4G, sans engagement, à tous les budgets." },
  { icon: "🎫", titre: "Suivi des tickets", texte: "Historique complet de vos échanges avec le support." },
  { icon: "🤖", titre: "Assistant IA", texte: "Des réponses immédiates aux questions fréquentes." },
  { icon: "🔒", titre: "Espace sécurisé", texte: "Vos données et votre compte protégés." },
];

// ⚠️ Cette liste doit rester identique à celle de /espace-client/offres
export const offres = [
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

interface OffreSelectionnee {
  nom: string;
  prix: string;
}

export default function IlnetHomePage() {
  const router = useRouter();
  const [slideActif, setSlideActif] = useState(0);
  const [offreChoisie, setOffreChoisie] = useState<OffreSelectionnee | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideActif((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero + carrousel */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Bienvenue chez <span className="text-blue-600">ILNET-TCHAD</span>
          </h1>
          <p className="text-lg text-gray-500 mb-2">Make your life easy with internet !</p>
          <p className="text-gray-500 mb-8 max-w-md">
            Votre fournisseur d&apos;accès internet au Tchad. Gérez votre abonnement,
            suivez vos demandes de support et discutez avec notre assistant IA,
            le tout depuis votre espace client.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/inscription"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Créer mon compte client
            </Link>
            <Link
              href="/service"
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>

        <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
          {slides.map((slide, index) => (
            <div
              key={slide.titre}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ${
                index === slideActif ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-6xl mb-4">{slide.emoji}</span>
              <h3 className="text-white text-xl font-bold mb-2">{slide.titre}</h3>
              <p className="text-white/90 text-sm max-w-sm">{slide.texte}</p>
            </div>
          ))}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.titre}
                onClick={() => setSlideActif(index)}
                aria-label={`Aller à la diapositive ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === slideActif ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nos offres */}
      <section className="bg-white border-t border-b" id="offres">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Nos offres</h2>
          <p className="text-gray-500 text-center mb-10">
            Choisissez l&apos;offre qui correspond à vos besoins, sans engagement.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offres.map((offre) => (
              <div
                key={offre.id}
                className={`relative bg-gray-50 rounded-lg p-6 border-t-4 ${offre.couleur} flex flex-col`}
              >
                {offre.populaire && (
                  <span className="absolute -top-3 right-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <p className="font-semibold text-gray-800 text-lg">{offre.nom}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {offre.prix} <span className="text-sm font-normal text-gray-500">FCFA / mois</span>
                </p>
                <p className="text-sm text-blue-600 font-medium mt-1">{offre.debit}</p>
                <p className="text-sm text-gray-500 mt-3 flex-1">{offre.description}</p>
                <button
                  onClick={() => setOffreChoisie({ nom: offre.nom, prix: offre.prix })}
                  className="mt-5 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Souscrire
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section>
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
            Tout ce dont vous avez besoin, au même endroit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fonctionnalites.map((f) => (
              <div
                key={f.titre}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition shadow"
              >
                <span className="text-3xl mb-3 inline-block">{f.icon}</span>
                <p className="font-semibold text-gray-800 mb-1">{f.titre}</p>
                <p className="text-sm text-gray-500">{f.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {offreChoisie && (
        <SouscriptionModal
          offre={offreChoisie}
          onClose={() => setOffreChoisie(null)}
          onSuccess={() => router.push("/espace-client/abonnement")}
        />
      )}
    </>
  );
}

function SouscriptionModal({
  offre,
  onClose,
  onSuccess,
}: {
  offre: OffreSelectionnee;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const existingClients = JSON.parse(localStorage.getItem("ilnet_clients") || "[]");

      if (existingClients.some((c: { email: string }) => c.email === form.email)) {
        setError("Un compte existe déjà avec cet email. Connectez-vous plutôt.");
        setIsLoading(false);
        return;
      }

      const newClient = {
        id: "c" + Date.now(),
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        address: form.address,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("ilnet_clients", JSON.stringify([...existingClients, newClient]));

      localStorage.setItem(
        "user",
        JSON.stringify({ name: newClient.name, email: newClient.email, role: "client" })
      );

      const existingSubs = JSON.parse(localStorage.getItem("ilnet_client_subscriptions") || "[]");
      existingSubs.push({
        id: "sub" + Date.now(),
        clientEmail: newClient.email,
        clientName: newClient.name,
        offre: offre.nom,
        prix: `${offre.prix} FCFA`,
        statut: "En attente de validation",
        dateDemande: new Date().toISOString(),
      });
      localStorage.setItem("ilnet_client_subscriptions", JSON.stringify(existingSubs));

      setIsLoading(false);
      onSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-gray-800">Créer mon compte</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Pour souscrire à <strong>{offre.nom}</strong> ({offre.prix} FCFA/mois), créez d&apos;abord votre compte client.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Téléphone"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Adresse"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 mt-2"
            >
              {isLoading ? "Création en cours..." : "Créer mon compte et souscrire"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Déjà client ?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Connectez-vous
            </Link>{" "}
            puis souscrivez depuis votre espace.
          </p>
        </div>
      </div>
    </div>
  );
}
