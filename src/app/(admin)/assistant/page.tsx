"use client";

import React, { useState } from "react";

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "IA", text: "Bonjour ! Je suis l'assistant IA d'ILNET-TCHAD. Comment puis-je vous aider aujourd'hui ?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = { id: messages.length + 1, sender: "Utilisateur", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const responses = [
        "Je comprends votre problème. Pouvez-vous me donner plus de détails ?",
        "Je vous suggère de redémarrer votre routeur. Si le problème persiste, je peux ouvrir un ticket.",
        "Votre demande a été enregistrée. Un agent vous contactera sous 24h.",
        "D'après vos informations, votre abonnement est toujours actif. Avez-vous essayé de vérifier votre connexion ?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const iaMessage = { id: messages.length + 2, sender: "IA", text: randomResponse };
      setMessages(prev => [...prev, iaMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 h-[calc(100vh-120px)] flex flex-col">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🤖 Assistant IA</h1>
        <p className="text-gray-500">Posez vos questions, l'IA vous répond automatiquement</p>
      </div>

      {/* Zone de chat */}
      <div className="flex-1 bg-white shadow rounded-lg flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "IA" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[70%] p-4 rounded-lg ${
                msg.sender === "IA" ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"
              }`}>
                <p className="font-medium text-sm mb-1">{msg.sender === "IA" ? "🤖 IA" : "👤 Vous"}</p>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">🤖 L'IA réfléchit...</p>
              </div>
            </div>
          )}
        </div>

        {/* Zone de saisie */}
        <div className="border-t p-4 flex gap-4">
          <input
            type="text"
            placeholder="Posez votre question..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            onClick={handleSend}
          >
            Envoyer
          </button>
        </div>
      </div>

      {/* Suggestions rapides */}
      <div className="mt-4 flex gap-2 flex-wrap">
        <span className="text-xs text-gray-500 mr-2">Suggestions :</span>
        {["Mon internet ne fonctionne pas", "Problème de facture", "Changer d'abonnement", "Contacter un agent"].map((suggestion) => (
          <button
            key={suggestion}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
            onClick={() => {
              setInput(suggestion);
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}