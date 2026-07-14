"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clients } from "@/lib/mockData";

export default function AgentClientsPage() {
  const [recherche, setRecherche] = useState("");

  const clientsFiltres = clients.filter(
    (c) =>
      c.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      c.email.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👥 Clients</h1>
        <p className="text-gray-500 text-sm">Consultez les informations des clients ILNET-TCHAD</p>
      </div>

      <input
        type="text"
        placeholder="Rechercher un client..."
        className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:border-blue-500"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500">
              <th className="p-3">Nom</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Abonnement</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {clientsFiltres.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{client.nom}</td>
                <td className="p-3">{client.telephone}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3">{client.abonnement}</td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      client.statut === "Actif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {client.statut}
                  </span>
                </td>
                <td className="p-3">
                  <Link
                    href={`/agentSupport/tickets?client=${encodeURIComponent(client.nom)}`}
                    className="text-blue-600 hover:underline text-xs font-medium"
                  >
                    Voir ses tickets →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
