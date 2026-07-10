"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

const navLinks = [
  { href: "/espace-client", label: "Accueil" },
  { href: "/espace-client/offres", label: "Nos offres" },
  { href: "/espace-client/abonnement", label: "Mon abonnement" },
  { href: "/espace-client/assistant", label: "Assistant IA" },
  { href: "/espace-client/profil", label: "Mon profil" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      router.replace("/login");
      return;
    }
    const parsed: SessionUser = JSON.parse(raw);
    if (parsed.role !== "client") {
      // Un admin/agent qui tombe ici : on le renvoie vers son espace
      router.replace("/");
      return;
    }
    setUser(parsed);
    setChecked(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de navigation client */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/espace-client" className="flex items-center">
            <Image
              src="/images/logo/ilnet-logo.png"
              alt="ILNET-TCHAD"
              width={120}
              height={85}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-500">
              👤 {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Déconnexion
            </button>
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t bg-white px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm font-medium ${
                  pathname === link.href ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t flex items-center justify-between">
              <span className="text-sm text-gray-500">👤 {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600"
              >
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contenu de la page */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
