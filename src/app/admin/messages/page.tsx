"use client";

import React, { useEffect, useState } from "react";

interface ContactMessage {
  id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  date: string;
  statut: "Nouveau" | "Traité";
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messageOuvert, setMessageOuvert] = useState<string | null>(null);

  useEffect(() => {
    const stored: ContactMessage[] = JSON.parse(
      localStorage.getItem("ilnet_contact_messages") || "[]"
    );
    setMessages(stored);
  }, []);

  const marquerTraite = (id: string) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, statut: "Traité" as const } : m
    );
    setMessages(updated);
    localStorage.setItem("ilnet_contact_messages", JSON.stringify(updated));
  };

  const nouveaux = messages.filter((m) => m.statut === "Nouveau").length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">✉️ Messages de contact</h1>
        <p className="text-gray-500">
          Messages envoyés depuis le formulaire de contact du site public
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500 inline-block">
          <p className="text-sm text-gray-500">Nouveaux messages</p>
          <p className="text-2xl font-bold">{nouveaux}</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-10 text-center text-gray-400">
          Aucun message reçu pour l&apos;instant.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="bg-white shadow rounded-lg overflow-hidden">
              <button
                onClick={() => setMessageOuvert(messageOuvert === m.id ? null : m.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800">{m.sujet}</p>
                    {m.statut === "Nouveau" && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {m.nom} · {m.email} · {new Date(m.date).toLocaleString("fr-FR")}
                  </p>
                </div>
                <span className="text-gray-400">
                  {messageOuvert === m.id ? "▲" : "▼"}
                </span>
              </button>

              {messageOuvert === m.id && (
                <div className="border-t p-4 bg-gray-50">
                  <p className="text-sm text-gray-700 whitespace-pre-line mb-4">
                    {m.message}
                  </p>
                  {m.statut === "Nouveau" && (
                    <button
                      onClick={() => marquerTraite(m.id)}
                      className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                    >
                      ✓ Marquer comme traité
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}