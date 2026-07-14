"use client";

import React, { useState, useRef, useEffect } from "react";
import { addTicket } from "@/lib/ticketsStore";

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

interface Message {
  id: number;
  sender: "IA" | "Utilisateur";
  text: string;
}

function buildAIResponse(input: string): { text: string; suggestTicket: boolean; category: string } {
  const msg = input.toLowerCase();

  if (msg.includes("internet") && (msg.includes("marche pas") || msg.includes("fonctionne pas") || msg.includes("panne") || msg.includes("coupé"))) {
    return {
      text:
        "Je suis désolé pour ce désagrément. Essayons d'abord ceci :\n" +
        "1️⃣ Redémarrez votre routeur (débranchez 10 secondes, puis rebranchez)\n" +
        "2️⃣ Vérifiez que les voyants du boîtier sont bien allumés\n" +
        "3️⃣ Vérifiez que votre abonnement est actif (voir 'Mon abonnement')\n\n" +
        "Si le problème persiste après ces étapes, je peux ouvrir un ticket pour qu'un agent vous contacte.",
      suggestTicket: true,
      category: "Panne internet",
    };
  }

  if (msg.includes("facture") || msg.includes("facturation") || msg.includes("paiement") || msg.includes("payer")) {
    return {
      text:
        "Pour toute question de facturation, vérifiez d'abord votre offre actuelle dans 'Mon abonnement'. " +
        "Si vous constatez une erreur sur un montant facturé, je peux ouvrir un ticket 'Facturation' pour qu'un agent vérifie votre dossier.",
      suggestTicket: true,
      category: "Facturation",
    };
  }

  if (msg.includes("lent") || msg.includes("lenteur") || msg.includes("ralenti")) {
    return {
      text:
        "Une lenteur réseau peut venir de plusieurs facteurs : nombre d'appareils connectés, heures de forte affluence, ou un souci technique local. " +
        "Essayez de redémarrer votre routeur. Si la lenteur persiste, je peux ouvrir un ticket 'Lenteur réseau'.",
      suggestTicket: true,
      category: "Lenteur réseau",
    };
  }

  if (msg.includes("changer") && msg.includes("abonnement")) {
    return {
      text:
        "Vous pouvez consulter toutes nos offres disponibles dans la section 'Nos offres' et souscrire directement en ligne. Voulez-vous que je vous y redirige ?",
      suggestTicket: false,
      category: "",
    };
  }

  if (msg.includes("agent") || msg.includes("humain") || msg.includes("conseiller")) {
    return {
      text:
        "Bien sûr, je vous mets en relation avec un agent support. Je vais ouvrir un ticket afin qu'un membre de notre équipe vous contacte rapidement.",
      suggestTicket: true,
      category: "Autre",
    };
  }

  return {
    text:
      "Je comprends votre message. Pouvez-vous préciser votre demande ? Par exemple : un problème de connexion, une question sur votre facture, ou changer d'abonnement.",
    suggestTicket: false,
    category: "",
  };
}

export default function ClientAssistantPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "IA",
      text: "Bonjour ! Je suis l'assistant IA d'ILNET-TCHAD. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<string | null>(null);
  const [ticketCreated, setTicketCreated] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = (textOverride?: string) => {
    const text = textOverride ?? input;
    if (!text.trim()) return;

    const userMessage: Message = { id: messages.length + 1, sender: "Utilisateur", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setTicketCreated(false);

    setTimeout(() => {
      const response = buildAIResponse(text);
      const iaMessage: Message = {
        id: messages.length + 2,
        sender: "IA",
        text: response.text,
      };
      setMessages((prev) => [...prev, iaMessage]);
      setIsLoading(false);
      setPendingTicket(response.suggestTicket ? response.category : null);
    }, 1200);
  };

  const handleOuvrirTicket = () => {
    if (!user || !pendingTicket) return;

    const lastUserMessage = [...messages].reverse().find((m) => m.sender === "Utilisateur");
    const today = new Date();
    const dateStr = today.toLocaleDateString("fr-FR");

    addTicket({
      client: user.name,
      clientEmail: user.email,
      categorie: pendingTicket as "Panne internet" | "Facturation" | "Lenteur réseau" | "Autre",
      date: dateStr,
      statut: "Ouvert",
      priorite: "Moyenne",
      messages: lastUserMessage
        ? [{ id: 1, auteur: "Client", texte: lastUserMessage.text, date: today.toISOString() }]
        : [],
    });

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "IA",
        text: `✅ Un ticket "${pendingTicket}" a été ouvert. Vous pouvez suivre son évolution dans "Mes tickets". Un agent ILNET-TCHAD va vous répondre très prochainement.`,
      },
    ]);
    setPendingTicket(null);
    setTicketCreated(true);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">🤖 Assistant IA</h1>
        <p className="text-gray-500 text-sm">
          Posez vos questions, l&apos;IA vous répond automatiquement
        </p>
      </div>

      <div className="flex-1 bg-white shadow rounded-lg flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "IA" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-lg whitespace-pre-line ${
                  msg.sender === "IA" ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"
                }`}
              >
                <p className="font-medium text-sm mb-1">
                  {msg.sender === "IA" ? "🤖 Assistant" : "👤 Vous"}
                </p>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">🤖 L&apos;IA réfléchit...</p>
              </div>
            </div>
          )}

          {pendingTicket && !isLoading && !ticketCreated && (
            <div className="flex justify-start">
              <button
                onClick={handleOuvrirTicket}
                className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
              >
                🎫 Ouvrir un ticket &quot;{pendingTicket}&quot;
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t p-4 flex gap-4">
          <input
            type="text"
            placeholder="Posez votre question..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            onClick={() => handleSend()}
          >
            Envoyer
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        <span className="text-xs text-gray-500 mr-2">Suggestions :</span>
        {["Mon internet ne fonctionne pas", "Problème de facture", "Changer d'abonnement", "Contacter un agent"].map(
          (s) => (
            <button
              key={s}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
              onClick={() => handleSend(s)}
            >
              {s}
            </button>
          )
        )}
      </div>
    </div>
  );
}
