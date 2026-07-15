"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Offres" },
  { href: "/service", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function IlnetHeader() {
  const pathname = usePathname();

  return (
    <>
      {/* Barre de contact */}
      <div className="bg-white border-b text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 h-9 flex items-center gap-6 text-orange-600 font-medium">
          <a href="tel:+235620841 81" className="flex items-center gap-1.5 hover:text-orange-700">
            📞 +235 62 08 41 81
          </a>
          <a href="mailto:sales@ilnet-telecoms.td" className="hidden sm:flex items-center gap-1.5 hover:text-orange-700">
            ✉️ sales@ilnet-telecoms.td
          </a>
        </div>
      </div>

      {/* En-tête principal */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
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
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-orange-600 transition"
            >
              Se connecter
            </Link>
            <Link
              href="/inscription"
              className="border border-orange-500 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-500 hover:text-white transition"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}