// Source de données partagée (simulation en attendant le backend Django).
// Toutes les pages (clients, tickets, abonnements, dashboard) lisent
// depuis ce fichier pour garantir des chiffres cohérents entre elles.
//
// Pour les TICKETS spécifiquement, ce fichier ne sert que de "graine"
// (données de démarrage) : la vraie source de vérité à l'exécution est
// src/lib/ticketsStore.ts, qui fusionne ces données avec celles stockées
// en localStorage (tickets créés par les clients, réponses des agents...).

export interface Client {
  id: number;
  nom: string;
  telephone: string;
  email: string;
  abonnement: string;
  statut: "Actif" | "Suspendu";
}

export const clients: Client[] = [
  { id: 1, nom: "Jean Mbock", telephone: "66 12 34 56", email: "jean@email.com", abonnement: "Fibre 50 Mbps", statut: "Actif" },
  { id: 2, nom: "Marie Ndiaye", telephone: "77 23 45 67", email: "marie@email.com", abonnement: "Fibre 100 Mbps", statut: "Actif" },
  { id: 3, nom: "Ali Mahamat", telephone: "99 34 56 78", email: "ali@email.com", abonnement: "4G 20 Go", statut: "Suspendu" },
  { id: 4, nom: "Fatima Hassan", telephone: "88 45 67 89", email: "fatima@email.com", abonnement: "Fibre 200 Mbps", statut: "Actif" },
  { id: 5, nom: "David Toure", telephone: "66 56 78 90", email: "david@email.com", abonnement: "4G 50 Go", statut: "Actif" },
];

export interface TicketMessage {
  id: number;
  auteur: "Agent" | "Client";
  texte: string;
  date: string; // ISO
}

export interface Ticket {
  id: number;
  client: string;
  clientEmail?: string;
  categorie: "Panne internet" | "Facturation" | "Lenteur réseau" | "Autre";
  date: string; // format dd/mm/yyyy
  statut: "Ouvert" | "En cours" | "Résolu";
  priorite: "Élevée" | "Moyenne" | "Faible";
  messages?: TicketMessage[];
}

export const tickets: Ticket[] = [
  {
    id: 1, client: "Jean Mbock", categorie: "Panne internet", date: "06/07/2025", statut: "En cours", priorite: "Élevée",
    messages: [
      { id: 1, auteur: "Client", texte: "Mon internet ne fonctionne plus depuis ce matin.", date: "2025-07-06T08:30:00" },
      { id: 2, auteur: "Agent", texte: "Bonjour, avez-vous déjà essayé de redémarrer le routeur ?", date: "2025-07-06T09:15:00" },
    ],
  },
  { id: 2, client: "Marie Ndiaye", categorie: "Facturation", date: "05/07/2025", statut: "Résolu", priorite: "Moyenne" },
  { id: 3, client: "Ali Mahamat", categorie: "Lenteur réseau", date: "04/07/2025", statut: "Ouvert", priorite: "Élevée" },
  { id: 4, client: "Fatima Hassan", categorie: "Panne internet", date: "22/06/2025", statut: "Résolu", priorite: "Élevée" },
  { id: 5, client: "David Toure", categorie: "Facturation", date: "15/06/2025", statut: "Résolu", priorite: "Faible" },
  { id: 6, client: "Jean Mbock", categorie: "Lenteur réseau", date: "03/06/2025", statut: "Résolu", priorite: "Moyenne" },
  { id: 7, client: "Marie Ndiaye", categorie: "Panne internet", date: "27/05/2025", statut: "Résolu", priorite: "Élevée" },
  { id: 8, client: "Ali Mahamat", categorie: "Facturation", date: "14/05/2025", statut: "Résolu", priorite: "Faible" },
  { id: 9, client: "Fatima Hassan", categorie: "Lenteur réseau", date: "02/05/2025", statut: "Résolu", priorite: "Moyenne" },
  { id: 10, client: "David Toure", categorie: "Panne internet", date: "19/04/2025", statut: "Résolu", priorite: "Élevée" },
  { id: 11, client: "Jean Mbock", categorie: "Facturation", date: "08/04/2025", statut: "Résolu", priorite: "Faible" },
  { id: 12, client: "Marie Ndiaye", categorie: "Lenteur réseau", date: "25/03/2025", statut: "Résolu", priorite: "Moyenne" },
];

export interface Subscription {
  id: number;
  client: string;
  offre: string;
  prix: string;
  dateDebut: string;
  statut: "Actif" | "Suspendu";
}

export const subscriptions: Subscription[] = [
  { id: 1, client: "Jean Mbock", offre: "Fibre 50 Mbps", prix: "15 000 FCFA", dateDebut: "01/01/2025", statut: "Actif" },
  { id: 2, client: "Marie Ndiaye", offre: "Fibre 100 Mbps", prix: "25 000 FCFA", dateDebut: "15/02/2025", statut: "Actif" },
  { id: 3, client: "Ali Mahamat", offre: "4G 20 Go", prix: "10 000 FCFA", dateDebut: "10/03/2025", statut: "Suspendu" },
  { id: 4, client: "Fatima Hassan", offre: "Fibre 200 Mbps", prix: "40 000 FCFA", dateDebut: "05/04/2025", statut: "Actif" },
  { id: 5, client: "David Toure", offre: "4G 50 Go", prix: "18 000 FCFA", dateDebut: "20/05/2025", statut: "Actif" },
];

// --- Statistiques dérivées ---
// Acceptent une liste de tickets en paramètre (par défaut celle de ce
// fichier), pour que ticketsStore.ts puisse réutiliser exactement la même
// logique de calcul avec la liste "live" (fusionnée depuis localStorage).

export function getDashboardStats(ticketsList: Ticket[] = tickets) {
  return {
    clients: clients.length,
    clientsActifs: clients.filter((c) => c.statut === "Actif").length,
    ticketsOuverts: ticketsList.filter((t) => t.statut === "Ouvert").length,
    ticketsEnCours: ticketsList.filter((t) => t.statut === "En cours").length,
    ticketsResolus: ticketsList.filter((t) => t.statut === "Résolu").length,
    abonnementsActifs: subscriptions.filter((s) => s.statut === "Actif").length,
  };
}

// Regroupe les tickets par mois (à partir du champ date dd/mm/yyyy)
// pour alimenter le graphique de statistiques mensuelles du dashboard.
export function getTicketsParMois(ticketsList: Ticket[] = tickets) {
  const moisLabels = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
  ];

  const counts: Record<string, number> = {};

  ticketsList.forEach((t) => {
    const [, mm, yyyy] = t.date.split("/");
    const key = `${yyyy}-${mm}`;
    counts[key] = (counts[key] || 0) + 1;
  });

  return Object.keys(counts)
    .sort()
    .map((key) => {
      const [, mm] = key.split("-");
      return {
        mois: moisLabels[parseInt(mm, 10) - 1],
        total: counts[key],
      };
    });
}
