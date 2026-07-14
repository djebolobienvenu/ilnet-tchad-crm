"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getDashboardStats, getTicketsParMois } from "@/lib/mockData";
import { getAllTickets } from "@/lib/ticketsStore";
import type { Ticket } from "@/lib/mockData";

// ApexCharts utilise `window`, donc on le charge uniquement côté client
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const statutColor: Record<string, string> = {
  "Ouvert": "bg-red-100 text-red-800",
  "En cours": "bg-yellow-100 text-yellow-800",
  "Résolu": "bg-green-100 text-green-800",
};

export default function DashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(getAllTickets());
  }, []);

  const stats = getDashboardStats(tickets);
  const ticketsParMois = getTicketsParMois(tickets);
  const derniersTickets = [...tickets].slice(-3).reverse();

  const chartOptions = {
    chart: { toolbar: { show: false }, fontFamily: "inherit" },
    xaxis: { categories: ticketsParMois.map((m) => m.mois) },
    colors: ["#3b82f6"],
    dataLabels: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "45%" } },
    grid: { strokeDashArray: 4 },
  };

  const chartSeries = [
    { name: "Tickets créés", data: ticketsParMois.map((m) => m.total) },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          👋 Bonjour, Bienvenue sur ILNET-TCHAD
        </h1>
        <p className="text-gray-500 mt-1">
          Voici un aperçu de l&apos;activité de votre plateforme CRM
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">👥 Clients</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.clients}</p>
            </div>
            <span className="text-3xl">👤</span>
          </div>
          <p className="text-xs text-green-600 mt-2">{stats.clientsActifs} actif(s)</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">🎫 Tickets ouverts</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.ticketsOuverts}</p>
            </div>
            <span className="text-3xl">📋</span>
          </div>
          <p className="text-xs text-yellow-600 mt-2">{stats.ticketsEnCours} en cours</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">✅ Tickets résolus</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.ticketsResolus}</p>
            </div>
            <span className="text-3xl">✔️</span>
          </div>
          <p className="text-xs text-green-600 mt-2">
            sur {tickets.length} ticket(s) au total
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">📡 Abonnements actifs</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.abonnementsActifs}</p>
            </div>
            <span className="text-3xl">📶</span>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            {stats.clients > 0 ? Math.round((stats.abonnementsActifs / stats.clients) * 100) : 0}% des clients
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">📈 Tickets créés par mois</h3>
        <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={260} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold text-gray-700 mb-4">🕐 Derniers tickets</h3>
          <div className="space-y-3">
            {derniersTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-sm">
                    {ticket.categorie} - {ticket.client}
                  </p>
                  <p className="text-xs text-gray-400">{ticket.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${statutColor[ticket.statut]}`}>
                  {ticket.statut}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/admin/tickets"
            className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline"
          >
            Voir tous les tickets →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold text-gray-700 mb-4">🤖 Assistant IA</h3>
          <div className="bg-gray-50 rounded-lg p-4 h-32 overflow-y-auto text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-blue-600">🤖 IA :</span> Bonjour ! Comment
              puis-je vous aider ?
            </p>
          </div>
          <Link
            href="/admin/assistant"
            className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Ouvrir l&apos;assistant IA →
          </Link>
        </div>
      </div>
    </div>
  );
}
