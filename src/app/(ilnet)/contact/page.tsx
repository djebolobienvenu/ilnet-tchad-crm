"use client";

import React, { useState } from "react";

interface ContactMessage {
  id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  date: string;
  statut: "Nouveau" | "Traité";
}

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existing: ContactMessage[] = JSON.parse(
      localStorage.getItem("ilnet_contact_messages") || "[]"
    );

    const nouveauMessage: ContactMessage = {
      id: "msg" + Date.now(),
      nom: form.nom,
      email: form.email,
      sujet: form.sujet,
      message: form.message,
      date: new Date().toISOString(),
      statut: "Nouveau",
    };

    localStorage.setItem(
      "ilnet_contact_messages",
      JSON.stringify([nouveauMessage, ...existing])
    );

    setEnvoye(true);
    setForm({ nom: "", email: "", sujet: "", message: "" });
    setTimeout(() => setEnvoye(false), 5000);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contactez-nous</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Une question, un problème, une demande spécifique ? Écrivez-nous, notre
          équipe vous répond rapidement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-lg shadow p-6">
          {envoye && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              ✅ Votre message a bien été envoyé. Nous vous répondrons dans les
              plus brefs délais.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <input
                type="text"
                name="sujet"
                value={form.sujet}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Envoyer le message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-semibold text-gray-800">Adresse</p>
              <p className="text-sm text-gray-500">N&apos;Djamena, Tchad</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
            <span className="text-2xl">📞</span>
            <div>
              <p className="font-semibold text-gray-800">Téléphone</p>
              <p className="text-sm text-gray-500">+235 66 00 00 00</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-sm text-gray-500">contact@ilnet-tchad.com</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
            <span className="text-2xl">🕐</span>
            <div>
              <p className="font-semibold text-gray-800">Horaires</p>
              <p className="text-sm text-gray-500">Lundi - Samedi, 8h - 18h</p>
              <p className="text-sm text-gray-500">Support en ligne 24h/24 via l&apos;assistant IA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}