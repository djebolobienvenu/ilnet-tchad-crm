"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTickets } from "@/lib/ticketsStore";
import type { Ticket } from "@/lib/mockData";

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

const statutColor: Record<string, string> = {
  "Ouvert": "bg-red-100 text-red-700",
  "En cours": "bg-yellow-100 text-yellow-700",
  "Résolu": "bg-green-100 text-green-700",
};

export default function MesTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
    setTickets(getAllTickets());
  }, []);

  const mesTickets = user
    ? tickets.filter(
        (t) => t.client.toLowerCase().trim() === user.name.toLowerCase().trim()
      )
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">🎫 Mes tickets</h1>
      <p className="text-gray-500 mb-6">
        Retrouvez ici l&apos;historique de vos demandes et les réponses de nos agents.
      </p>

      {mesTickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-700 font-medium mb-1">
            Vous n&apos;avez aucun ticket pour le moment.
          </p>
          <p className="text-gray-500 text-sm mb-5">
            Besoin d&apos;aide ? Discutez avec notre assistant IA, il peut ouvrir un ticket pour vous.
          </p>
          <Link
            href="/espace-client/assistant"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Ouvrir l&apos;assistant IA
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {mesTickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/espace-client/tickets/${ticket.id}`}
              className="flex items-center justify-between bg-white rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <div>
                <p className="font-medium text-gray-800">
                  #{ticket.id} — {ticket.categorie}
                </p>
                <p className="text-sm text-gray-500">{ticket.date}</p>
                {ticket.messages && ticket.messages.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    {ticket.messages.length} message(s) échangé(s)
                  </p>
                )}
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${statutColor[ticket.statut]}`}>
                {ticket.statut}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
