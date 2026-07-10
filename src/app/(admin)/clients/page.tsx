"use client";

import React, { useState } from "react";
import { clients as clientsData } from "@/lib/mockData";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clientsData.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.telephone.includes(searchTerm)
  );

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">👥 Gestion des clients</h1>
          <p className="text-gray-500 mt-1">Gérez tous vos clients ILNET-TCHAD</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          + Nouveau client
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="🔍 Rechercher un client..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500">
            <option value="">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="Suspendu">Suspendu</option>
            <option value="Résilié">Résilié</option>
          </select>
        </div>
      </div>

      {/* Tableau des clients */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Client</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Téléphone</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Email</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Abonnement</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Statut</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-3 font-medium text-gray-800">{client.nom}</td>
                  <td className="px-6 py-3 text-gray-600">{client.telephone}</td>
                  <td className="px-6 py-3 text-gray-600">{client.email}</td>
                  <td className="px-6 py-3 text-gray-600">{client.abonnement}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.statut === "Actif" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {client.statut}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">✏️</button>
                    <button className="text-red-600 hover:text-red-800">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pied de page */}
      <div className="mt-4 text-sm text-gray-500">
        Total : {filteredClients.length} client(s) trouvé(s)
      </div>
    </div>
  );
}