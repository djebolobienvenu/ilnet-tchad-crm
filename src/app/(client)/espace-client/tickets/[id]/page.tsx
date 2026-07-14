"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTicketById, addTicketMessage } from "@/lib/ticketsStore";
import type { Ticket } from "@/lib/mockData";

const statutColor: Record<string, string> = {
  "Ouvert": "bg-red-100 text-red-700",
  "En cours": "bg-yellow-100 text-yellow-700",
  "Résolu": "bg-green-100 text-green-700",
};

export default function MonTicketDetailPage() {
  const params = useParams();
  const ticketId = Number(params.id);

  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTicket(getTicketById(ticketId));
  }, [ticketId]);

  const handleEnvoyer = () => {
    if (!message.trim()) return;
    addTicketMessage(ticketId, "Client", message.trim());
    setTicket(getTicketById(ticketId));
    setMessage("");
  };

  if (!ticket) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 mb-4">Ticket introuvable.</p>
        <Link href="/espace-client/tickets" className="text-blue-600 hover:underline text-sm">
          ← Retour à mes tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/espace-client/tickets"
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Retour à mes tickets
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Ticket #{ticket.id} — {ticket.categorie}
            </h1>
            <p className="text-sm text-gray-500">Ouvert le {ticket.date}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${statutColor[ticket.statut]}`}>
            {ticket.statut}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-gray-700 mb-4">💬 Échanges avec le support</h2>

        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
          {(ticket.messages || []).length === 0 && (
            <p className="text-sm text-gray-400">
              Aucun message pour l&apos;instant. Un agent va bientôt vous répondre.
            </p>
          )}
          {(ticket.messages || []).map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.auteur === "Client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg text-sm ${
                  msg.auteur === "Client" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-xs font-medium mb-1 opacity-80">
                  {msg.auteur === "Client" ? "👤 Vous" : "🎧 Agent ILNET-TCHAD"}
                </p>
                <p>{msg.texte}</p>
                <p className="text-[10px] opacity-60 mt-1">
                  {new Date(msg.date).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {ticket.statut !== "Résolu" ? (
          <div className="flex gap-3 border-t pt-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un message..."
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
        ) : (
          <p className="text-sm text-gray-400 border-t pt-4 text-center">
            Ce ticket est marqué comme résolu. Besoin d&apos;autre chose ? Ouvrez un nouveau ticket depuis l&apos;assistant IA.
          </p>
        )}
      </div>
    </div>
  );
}
