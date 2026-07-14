"use client";

// Store de tickets unifié : fusionne les tickets de démonstration
// (src/lib/mockData.ts) avec ceux créés dynamiquement (par un client via
// l'assistant IA, ou par un agent qui répond). Tout est persisté dans
// localStorage en attendant le vrai backend Django.
//
// C'est la SEULE source à utiliser pour lire/écrire des tickets dans les
// espaces admin et agentSupport, afin que tout le monde voie exactement
// les mêmes données (plus de doublon comme avant avec "ilnet_client_tickets").

import { tickets as seedTickets, Ticket, TicketMessage } from "./mockData";

const STORAGE_KEY = "ilnet_tickets_store";
const LEGACY_CLIENT_TICKETS_KEY = "ilnet_client_tickets";

interface LegacyClientTicket {
  id?: string;
  clientEmail: string;
  clientName: string;
  categorie: Ticket["categorie"];
  message: string;
  statut?: Ticket["statut"];
  priorite?: Ticket["priorite"];
  date: string; // ISO
}

function nextId(all: Ticket[]): number {
  return all.length ? Math.max(...all.map((t) => t.id)) + 1 : 1;
}

function hydrate(): Ticket[] {
  if (typeof window === "undefined") return seedTickets;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Ticket[];
    } catch {
      // en cas de données corrompues, on repart des données de base
    }
  }

  // Première utilisation : on part des tickets de démo, et on récupère
  // aussi les tickets déjà créés par des clients via l'ancien stockage.
  let legacy: LegacyClientTicket[] = [];
  try {
    legacy = JSON.parse(localStorage.getItem(LEGACY_CLIENT_TICKETS_KEY) || "[]");
  } catch {
    legacy = [];
  }

  let idCounter = nextId(seedTickets);
  const converted: Ticket[] = legacy.map((t) => {
    const dateStr = new Date(t.date).toLocaleDateString("fr-FR");
    const messages: TicketMessage[] = t.message
      ? [{ id: 1, auteur: "Client", texte: t.message, date: t.date }]
      : [];
    return {
      id: idCounter++,
      client: t.clientName,
      clientEmail: t.clientEmail,
      categorie: t.categorie,
      date: dateStr,
      statut: t.statut || "Ouvert",
      priorite: t.priorite || "Moyenne",
      messages,
    };
  });

  const initial = [...seedTickets, ...converted];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function persist(all: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getAllTickets(): Ticket[] {
  return hydrate();
}

export function getTicketById(id: number): Ticket | undefined {
  return hydrate().find((t) => t.id === id);
}

export function updateTicketStatus(id: number, statut: Ticket["statut"]): Ticket[] {
  const all = hydrate().map((t) => (t.id === id ? { ...t, statut } : t));
  persist(all);
  return all;
}

export function addTicketMessage(
  id: number,
  auteur: "Agent" | "Client",
  texte: string
): Ticket[] {
  const all = hydrate().map((t) => {
    if (t.id !== id) return t;
    const messages = t.messages || [];
    const newMessage: TicketMessage = {
      id: messages.length ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
      auteur,
      texte,
      date: new Date().toISOString(),
    };
    return { ...t, messages: [...messages, newMessage] };
  });
  persist(all);
  return all;
}

export function addTicket(ticket: Omit<Ticket, "id">): Ticket {
  const all = hydrate();
  const newTicket: Ticket = { ...ticket, id: nextId(all) };
  persist([...all, newTicket]);
  return newTicket;
}
