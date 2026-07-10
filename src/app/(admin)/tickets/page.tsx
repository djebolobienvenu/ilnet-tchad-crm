"use client";

import { tickets } from "@/lib/mockData";

export default function TicketsPage() {
  const ticketsOuverts = tickets.filter((t) => t.statut === "Ouvert").length;
  const ticketsEnCours = tickets.filter((t) => t.statut === "En cours").length;
  const ticketsResolus = tickets.filter((t) => t.statut === "Résolu").length;

  const getStatutColor = (statut: string) => {
    const colors = {
      "Ouvert": "bg-red-100 text-red-700",
      "En cours": "bg-yellow-100 text-yellow-700",
      "Résolu": "bg-green-100 text-green-700",
    };
    return colors[statut as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🎫 Gestion des tickets</h1>
          <p className="text-gray-500">Suivez et gérez les demandes de vos clients</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          + Nouveau ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Ouverts</p>
          <p className="text-2xl font-bold">{ticketsOuverts}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">En cours</p>
          <p className="text-2xl font-bold">{ticketsEnCours}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Résolus</p>
          <p className="text-2xl font-bold">{ticketsResolus}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">Catégorie</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Priorité</th>
              <th className="px-6 py-3 text-left">Statut</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">#{ticket.id}</td>
                <td className="px-6 py-3">{ticket.client}</td>
                <td className="px-6 py-3">{ticket.categorie}</td>
                <td className="px-6 py-3">{ticket.date}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.priorite === "Élevée" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {ticket.priorite}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(ticket.statut)}`}>
                    {ticket.statut}
                  </span>
                </td>
                <td className="px-6 py-3 text-center">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">👁️</button>
                  <button className="text-green-600 hover:text-green-800 mr-3">✏️</button>
                  <button className="text-red-600 hover:text-red-800">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}