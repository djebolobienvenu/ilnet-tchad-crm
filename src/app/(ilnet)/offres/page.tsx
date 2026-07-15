"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OffreSelectionnee {
  nom: string;
  prix: string;
}

// --- Données réelles ILNET TELECOM ---

const fibreFormules = [
  { nom: "Formule S", debit: "5 Mbps / 1 Mbps Asymétrique + TV", prix: "25 000" },
  { nom: "Formule L", debit: "7 Mbps / 1 Mbps Asymétrique + TV", prix: "35 000" },
  { nom: "Formule XL", debit: "10 Mbps / 2 Mbps Asymétrique + TV", prix: "50 000" },
  { nom: "Formule XXL", debit: "20 Mbps / 3 Mbps Asymétrique + TV", prix: "90 000" },
];

const tarifsData = {
  mensuels: [
    { volume: "1 Go", prix: "1 000" },
    { volume: "3 Go", prix: "1 500" },
    { volume: "6 Go", prix: "2 500" },
    { volume: "15 Go", prix: "3 500" },
    { volume: "30 Go", prix: "6 000" },
    { volume: "60 Go", prix: "11 000" },
    { volume: "113 Go", prix: "15 000" },
    { volume: "Illimité", prix: "50 000" },
  ],
  hebdo: [
    { volume: "6 Go", prix: "1 500" },
    { volume: "12 Go", prix: "2 000" },
  ],
  journaliers: [
    { volume: "1 Go — 1 jour", prix: "300" },
    { volume: "2 Go — 2 jours", prix: "500" },
  ],
};

type ProduitCle = "fibre" | "modem" | "routeur";

const produits: Record<
  ProduitCle,
  { label: string; image: string; sousTitre: string }
> = {
  fibre: {
    label: "Fibre optique domicile",
    image: "/images/offres/fibre-domicile.png",
    sousTitre: "Internet illimité + télévision HD, jusqu'à 400 chaînes en option",
  },
  modem: {
    label: "Modem 4G",
    image: "/images/offres/modem-4g.png",
    sousTitre: "La 4G haut débit, rapide et fiable, où que vous soyez",
  },
  routeur: {
    label: "Routeur 4G",
    image: "/images/offres/routeur.png",
    sousTitre: "Du wifi très haut débit pour toute la maison ou le bureau",
  },
};

export default function OffresPage() {
  const router = useRouter();
  const [produitActif, setProduitActif] = useState<ProduitCle>("fibre");
  const [offreChoisie, setOffreChoisie] = useState<OffreSelectionnee | null>(null);

  const produit = produits[produitActif];

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Nos offres</h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">
          Choisissez un produit pour voir le détail des tarifs et souscrire.
        </p>

        {/* Liste déroulante */}
        <div className="max-w-xs mx-auto">
          <select
            value={produitActif}
            onChange={(e) => setProduitActif(e.target.value as ProduitCle)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:border-orange-500 bg-white shadow-sm cursor-pointer"
          >
            <option value="modem">Modem 4G</option>
            <option value="routeur">Routeur 4G</option>
            <option value="fibre">Fibre optique domicile</option>
          </select>
        </div>
      </section>

      {/* Détail du produit sélectionné */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-50 px-6 py-3 text-center">
            <p className="font-semibold text-gray-700">
              Plus de détails : {produit.label}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Image produit */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden bg-orange-50">
                <Image
                  src={produit.image}
                  alt={produit.label}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">{produit.sousTitre}</p>
            </div>

            {/* Détails / tarifs */}
            <div>
              {produitActif === "fibre" ? (
                <FibreDetails onSouscrire={setOffreChoisie} />
              ) : (
                <TarifsDetails onSouscrire={setOffreChoisie} />
              )}
            </div>
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

function FibreDetails({
  onSouscrire,
}: {
  onSouscrire: (o: OffreSelectionnee) => void;
}) {
  return (
    <div>
      <p className="text-orange-600 font-bold text-lg mb-4">Fibre Optique Domicile</p>

      <div className="space-y-3 mb-6">
        {fibreFormules.map((f) => (
          <div
            key={f.nom}
            className="flex items-center justify-between border-b pb-3 last:border-b-0"
          >
            <div>
              <p className="font-semibold text-gray-800 text-sm">{f.nom}</p>
              <p className="text-xs text-gray-500">{f.debit}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-gray-900 whitespace-nowrap">{f.prix} F CFA</p>
              <button
                onClick={() => onSouscrire({ nom: `Fibre domicile — ${f.nom}`, prix: f.prix })}
                className="bg-orange-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
              >
                Souscrire
              </button>
            </div>
          </div>
        ))}
      </div>

      <ul className="text-sm text-gray-500 space-y-1">
        <li>• Service TV 400 chaînes en additionnel</li>
        <li>• Les équipements appartiennent à ILNET</li>
        <li>• Installation : 50 000 FCFA jusqu&apos;à 1 km</li>
      </ul>
    </div>
  );
}

function TarifsDetails({
  onSouscrire,
}: {
  onSouscrire: (o: OffreSelectionnee) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-orange-600 font-semibold mb-2">Tarifs mensuels</p>
        <div className="space-y-1.5">
          {tarifsData.mensuels.map((t) => (
            <TarifLigne key={t.volume} tarif={t} onSouscrire={onSouscrire} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-orange-600 font-semibold mb-2">Tarifs hebdomadaires</p>
        <div className="space-y-1.5">
          {tarifsData.hebdo.map((t) => (
            <TarifLigne key={t.volume} tarif={t} onSouscrire={onSouscrire} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-orange-600 font-semibold mb-2">Tarifs journaliers</p>
        <div className="space-y-1.5">
          {tarifsData.journaliers.map((t) => (
            <TarifLigne key={t.volume} tarif={t} onSouscrire={onSouscrire} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TarifLigne({
  tarif,
  onSouscrire,
}: {
  tarif: { volume: string; prix: string };
  onSouscrire: (o: OffreSelectionnee) => void;
}) {
  return (
    <div className="flex items-center justify-between text-sm py-1">
      <span className="font-medium text-gray-700">{tarif.volume}</span>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-900 whitespace-nowrap">{tarif.prix} F CFA</span>
        <button
          onClick={() => onSouscrire({ nom: tarif.volume, prix: tarif.prix })}
          className="text-orange-600 hover:text-orange-700 text-xs font-medium underline whitespace-nowrap"
        >
          Souscrire
        </button>
      </div>
    </div>
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
    name: "", phone: "", email: "", address: "", password: "", confirmPassword: "",
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
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none" aria-label="Fermer">
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Pour souscrire à <strong>{offre.nom}</strong> ({offre.prix} FCFA), créez d&apos;abord votre compte client.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="name" placeholder="Nom complet" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500" value={form.name} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Téléphone" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500" value={form.phone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500" value={form.email} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Adresse" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500" value={form.address} onChange={handleChange} />
            <input type="password" name="password" placeholder="Mot de passe" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500" value={form.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500" value={form.confirmPassword} onChange={handleChange} required />

            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition disabled:opacity-50 mt-2">
              {isLoading ? "Création en cours..." : "Créer mon compte et souscrire"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Déjà client ?{" "}
            <Link href="/login" className="text-orange-600 hover:underline">Connectez-vous</Link>{" "}
            puis souscrivez depuis votre espace.
          </p>
        </div>
      </div>
    </div>
  );
}
