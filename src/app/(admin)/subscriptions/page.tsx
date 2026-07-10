"use client";

import { subscriptions } from "@/lib/mockData";

export default function SubscriptionsPage() {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📡 Gestion des abonnements</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition mb-6">
        + Nouvel abonnement
      </button>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">Offre</th>
              <th className="px-6 py-3 text-left">Prix</th>
              <th className="px-6 py-3 text-left">Date début</th>
              <th className="px-6 py-3 text-left">Statut</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{sub.client}</td>
                <td className="px-6 py-3">{sub.offre}</td>
                <td className="px-6 py-3 font-medium">{sub.prix}</td>
                <td className="px-6 py-3">{sub.dateDebut}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sub.statut === "Actif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {sub.statut}
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
  );
}