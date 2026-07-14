import {
  GridIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "@/icons/index";
import type { NavItem } from "@/types/menu";

// Menu principal — espace Agent Support
export const agentNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Tableau de bord",
    path: "/agentSupport",
  },
  {
    icon: <TableIcon />,
    name: "Tickets",
    path: "/agentSupport/tickets",
  },
  {
    icon: <UserCircleIcon />,
    name: "Clients",
    path: "/agentSupport/clients",
  },
  {
    icon: <PlugInIcon />,
    name: "Assistant IA",
    path: "/agentSupport/assistant",
  },
];

// Section "Paramètres" — espace Agent Support
export const agentOthersItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "Mon Profil",
    path: "/agentSupport/profile",
  },
];