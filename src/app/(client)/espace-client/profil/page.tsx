"use client";

import React, { useEffect, useState } from "react";

interface ClientAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  createdAt: string;
}

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

export default function ProfilPage() {
  const [client, setClient] = useState<ClientAccount | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return;
    const user: SessionUser = JSON.parse(rawUser);

    const clients: ClientAccount[] = JSON.parse(
      localStorage.getItem("ilnet_clients") || "[]"
    );
    const found = clients.find((c) => c.email === user.email);
    if (found) {
      setClient(found);
      setForm({ name: found.name, phone: found.phone, address: found.address });
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;

    const clients: ClientAccount[] = JSON.parse(
      localStorage.getItem("ilnet_clients") || "[]"
    );
    const updated = clients.map((c) =>
      c.id === client.id ? { ...c, ...form } : c
    );
    localStorage.setItem("ilnet_clients", JSON.stringify(updated));

    // Met à jour aussi la session affichée dans la navbar
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      const user: SessionUser = JSON.parse(rawUser);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: form.name })
      );
    }

    setClient({ ...client, ...form });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!client) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-sm">
          Profil introuvable. Reconnectez-vous.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">👤 Mon profil</h1>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg mb-4 text-sm">
          Profil mis à jour avec succès.
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase">Nom complet</p>
              <p className="text-gray-800 font-medium">{client.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Email</p>
              <p className="text-gray-800 font-medium">{client.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Téléphone</p>
              <p className="text-gray-800 font-medium">{client.phone || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Adresse</p>
              <p className="text-gray-800 font-medium">{client.address || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Client depuis</p>
              <p className="text-gray-800 font-medium">
                {new Date(client.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              ✏️ Modifier mes informations
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
