"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getTicketById,
  addTicketMessage,
  updateTicketStatus,
} from "@/lib/ticketsStore";
import type { Ticket } from "@/lib/mockData";

const statutColor: Record<string, string> = {
  "Ouvert": "bg-red-100 text-red-700",
  "En cours": "bg-yellow-100 text-yellow-700",
  "Résolu": "bg-green-100 text-green-700",
};

export default function AdminTicketDetailPage() {
  const params = useParams();
  const ticketId = Number(params.id);

  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [reponse, setReponse] = useState("");

  useEffect(() => {
    setTicket(getTicketById(ticketId));
  }, [ticketId]);

  const handleEnvoyer = () => {
    if (!reponse.trim()) return;
    addTicketMessage(ticketId, "Agent", reponse.trim());
    setTicket(getTicketById(ticketId));
    setReponse("");
  };

  const handleChangerStatut = (statut: Ticket["statut"]) => {
    updateTicketStatus(ticketId, statut);
    setTicket(getTicketById(ticketId));
  };

  if (!ticket) {
    return (
      <div className="p-6">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">Ticket introuvable.</p>
          <Link href="/admin/tickets" className="text-blue-600 hover:underline text-sm">
            ← Retour à la liste des tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <Link
          href="/admin/tickets"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Retour à la liste des tickets
        </Link>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Ticket #{ticket.id} — {ticket.categorie}
              </h1>
              <p className="text-sm text-gray-500">
                Client : <span className="font-medium">{ticket.client}</span> · {ticket.date}
              </p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${statutColor[ticket.statut]}`}>
              {ticket.statut}
            </span>
          </div>

          <div className="flex gap-2">
            {(["Ouvert", "En cours", "Résolu"] as const).map((s) => (
              <button
                key={s}
                onClick={() => handleChangerStatut(s)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                  ticket.statut === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Marquer {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-semibold text-gray-700 mb-4">💬 Échanges</h2>

          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {(ticket.messages || []).length === 0 && (
              <p className="text-sm text-gray-400">Aucun message pour l&apos;instant.</p>
            )}
            {(ticket.messages || []).map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.auteur === "Agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg text-sm ${
                    msg.auteur === "Agent" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-xs font-medium mb-1 opacity-80">
                    {msg.auteur === "Agent" ? "👤 Vous" : `👤 ${ticket.client}`}
                  </p>
                  <p>{msg.texte}</p>
                  <p className="text-[10px] opacity-60 mt-1">
                    {new Date(msg.date).toLocaleString("fr-FR")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 border-t pt-4">
            <textarea
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              placeholder="Écrire une réponse au client..."
              rows={2}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
            <button
              onClick={handleEnvoyer}
              className="bg-blue-600 text-white px-5 rounded-lg text-sm font-medium hover:bg-blue-700 transition self-end h-fit py-2"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
