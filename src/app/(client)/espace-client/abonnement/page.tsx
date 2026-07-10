"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

interface SubscriptionRequest {
  id: string;
  clientEmail: string;
  clientName: string;
  offre: string;
  prix: string;
  statut: string;
  dateDemande: string;
}

// Abonnements déjà actifs côté admin (données de démonstration partagées
// avec la page /tickets et /subscriptions de l'espace admin)
const abonnementsActifsDemo: Record<
  string,
  { offre: string; prix: string; dateDebut: string; statut: string }
> = {
  "jean mbock": { offre: "Fibre 50 Mbps", prix: "15 000 FCFA", dateDebut: "01/01/2025", statut: "Actif" },
  "marie ndiaye": { offre: "Fibre 100 Mbps", prix: "25 000 FCFA", dateDebut: "15/02/2025", statut: "Actif" },
  "ali mahamat": { offre: "4G 20 Go", prix: "10 000 FCFA", dateDebut: "10/03/2025", statut: "Suspendu" },
};

export default function AbonnementPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [demandes, setDemandes] = useState<SubscriptionRequest[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;
    const parsed: SessionUser = JSON.parse(raw);
    setUser(parsed);

    const allRequests: SubscriptionRequest[] = JSON.parse(
      localStorage.getItem("ilnet_client_subscriptions") || "[]"
    );
    setDemandes(allRequests.filter((r) => r.clientEmail === parsed.email));
  }, []);

  const abonnementActif = user
    ? abonnementsActifsDemo[user.name.toLowerCase().trim()]
    : undefined;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📡 Mon abonnement</h1>

      {abonnementActif && (
        <div className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-800 text-lg">
              {abonnementActif.offre}
            </p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                abonnementActif.statut === "Actif"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {abonnementActif.statut}
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            {abonnementActif.prix} / mois — actif depuis le{" "}
            {abonnementActif.dateDebut}
          </p>
        </div>
      )}

      {demandes.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-3">
            Demandes en cours
          </p>
          <div className="space-y-3">
            {demandes.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-lg shadow p-4 flex items-center justify-between border-l-4 border-yellow-400"
              >
                <div>
                  <p className="font-medium text-gray-800">{d.offre}</p>
                  <p className="text-sm text-gray-500">
                    {d.prix} / mois — demandé le{" "}
                    {new Date(d.dateDemande).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  {d.statut}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!abonnementActif && demandes.length === 0 && (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-700 font-medium mb-1">
            Vous n&apos;avez aucun abonnement pour le moment.
          </p>
          <p className="text-gray-500 text-sm mb-5">
            Découvrez nos offres et souscrivez en quelques clics.
          </p>
          <Link
            href="/espace-client/offres"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Voir les offres
          </Link>
        </div>
      )}
    </div>
  );
}
