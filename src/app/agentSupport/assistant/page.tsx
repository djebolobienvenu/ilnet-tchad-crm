"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  sender: "IA" | "Agent";
  text: string;
}

function buildAIResponse(input: string): string {
  const msg = input.toLowerCase();

  if (msg.includes("internet") && (msg.includes("marche pas") || msg.includes("fonctionne pas") || msg.includes("panne"))) {
    return "Suggestion pour le client : vérifier le redémarrage du routeur, l'état des voyants, et le statut de son abonnement. Si le souci persiste après ça, ça peut être une panne réseau côté infrastructure à vérifier.";
  }
  if (msg.includes("facture") || msg.includes("facturation")) {
    return "Vérifiez l'historique de facturation du client dans son profil, et comparez avec l'offre souscrite. Les erreurs les plus fréquentes viennent d'un changement d'offre mal appliqué.";
  }
  if (msg.includes("lent") || msg.includes("lenteur")) {
    return "Demandez au client le nombre d'appareils connectés et l'heure du problème (souvent lié aux heures de pointe). Un test de débit peut aider à objectiver le souci.";
  }
  return "Je suis l'assistant interne pour vous aider à traiter les demandes clients plus vite. Décrivez la situation du client et je vous suggérerai une piste.";
}

export default function AgentAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "IA",
      text: "Bonjour ! Je suis l'assistant interne ILNET-TCHAD. Décrivez-moi la situation d'un client et je vous aiderai à y répondre.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: messages.length + 1, sender: "Agent", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const reply = buildAIResponse(userMessage.text);
      setMessages((prev) => [...prev, { id: prev.length + 1, sender: "IA", text: reply }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">🤖 Assistant IA (interne)</h1>
        <p className="text-gray-500 text-sm">
          Un coup de main pour traiter les demandes clients plus rapidement
        </p>
      </div>

      <div className="flex-1 bg-white shadow rounded-lg flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "IA" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[75%] p-4 rounded-lg text-sm ${
                  msg.sender === "IA" ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"
                }`}
              >
                <p className="font-medium text-xs mb-1 opacity-80">
                  {msg.sender === "IA" ? "🤖 Assistant" : "👤 Vous"}
                </p>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-500">
                🤖 L&apos;IA réfléchit...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t p-4 flex gap-4">
          <input
            type="text"
            placeholder="Décrivez la situation du client..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
