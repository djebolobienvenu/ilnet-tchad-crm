import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  ListIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  PageIcon,
} from "@/icons/index";
import type { NavItem } from "@/types/menu";

// Menu principal — espace Administrateur
export const adminNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Tableau de bord",
    path: "/admin",
  },
  {
    icon: <UserCircleIcon />,
    name: "Clients",
    path: "/admin/clients",
  },
  {
    icon: <ListIcon />,
    name: "Abonnements",
    path: "/admin/subscriptions",
  },
  {
    icon: <TableIcon />,
    name: "Tickets",
    path: "/admin/tickets",
  },
  {
    icon: <PageIcon />,
    name: "Messages",
    path: "/admin/messages",
  },
  {
    icon: <PlugInIcon />,
    name: "Assistant IA",
    path: "/admin/assistant",
  },
];

// Section "Paramètres" — espace Administrateur
export const adminOthersItems: NavItem[] = [
  {
    icon: <CalenderIcon />,
    name: "Calendrier",
    path: "/admin/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "Mon Profil",
    path: "/admin/profile",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Paramètres",
    path: "/admin/settings",
  },
];