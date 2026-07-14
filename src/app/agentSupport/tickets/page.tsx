"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAllTickets } from "@/lib/ticketsStore";
import type { Ticket } from "@/lib/mockData";

const statutColor: Record<string, string> = {
  "Ouvert": "bg-red-100 text-red-700",
  "En cours": "bg-yellow-100 text-yellow-700",
  "Résolu": "bg-green-100 text-green-700",
};

const prioriteColor: Record<string, string> = {
  "Élevée": "bg-red-50 text-red-600",
  "Moyenne": "bg-yellow-50 text-yellow-600",
  "Faible": "bg-gray-100 text-gray-600",
};

export default function AgentTicketsPage() {
  const searchParams = useSearchParams();
  const clientFiltre = searchParams.get("client");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filtre, setFiltre] = useState<string>("Tous");

  useEffect(() => {
    setTickets(getAllTickets());
  }, []);

  let ticketsFiltres =
    filtre === "Tous" ? tickets : tickets.filter((t) => t.statut === filtre);

  if (clientFiltre) {
    ticketsFiltres = ticketsFiltres.filter((t) => t.client === clientFiltre);
  }

  const compteurs = {
    Ouvert: tickets.filter((t) => t.statut === "Ouvert").length,
    "En cours": tickets.filter((t) => t.statut === "En cours").length,
    Résolu: tickets.filter((t) => t.statut === "Résolu").length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🎫 Gestion des tickets</h1>
        <p className="text-gray-500 text-sm">Suivez et répondez aux demandes des clients</p>
      </div>

      {clientFiltre && (
        <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm px-4 py-2 rounded-lg mb-4 flex items-center justify-between">
          <span>Filtré sur le client : <strong>{clientFiltre}</strong></span>
          <Link href="/agentSupport/tickets" className="text-blue-600 hover:underline text-xs">
            Retirer le filtre ✕
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setFiltre("Ouvert")}
          className="bg-white shadow rounded-lg p-4 border-l-4 border-red-500 text-left hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">Ouverts</p>
          <p className="text-2xl font-bold">{compteurs.Ouvert}</p>
        </button>
        <button
          onClick={() => setFiltre("En cours")}
          className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500 text-left hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">En cours</p>
          <p className="text-2xl font-bold">{compteurs["En cours"]}</p>
        </button>
        <button
          onClick={() => setFiltre("Résolu")}
          className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500 text-left hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">Résolus</p>
          <p className="text-2xl font-bold">{compteurs.Résolu}</p>
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">Filtre :</span>
        {["Tous", "Ouvert", "En cours", "Résolu"].map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`text-xs px-3 py-1 rounded-full transition ${
              filtre === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500">
              <th className="p-3">ID</th>
              <th className="p-3">Client</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3">Date</th>
              <th className="p-3">Priorité</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {ticketsFiltres.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-500">#{ticket.id}</td>
                <td className="p-3 font-medium">{ticket.client}</td>
                <td className="p-3">{ticket.categorie}</td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded ${prioriteColor[ticket.priorite]}`}>
                    {ticket.priorite}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded ${statutColor[ticket.statut]}`}>
                    {ticket.statut}
                  </span>
                </td>
                <td className="p-3">
                  <Link
                    href={`/agentSupport/tickets/${ticket.id}`}
                    className="text-blue-600 hover:underline text-xs font-medium"
                  >
                    Ouvrir →
                  </Link>
                </td>
              </tr>
            ))}
            {ticketsFiltres.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Aucun ticket dans cette catégorie.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
