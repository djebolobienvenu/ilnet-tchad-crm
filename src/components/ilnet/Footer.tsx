import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function IlnetFooter() {
  return (
    <footer>
      {/* Bandeau clair : logo + slogan */}
      <div className="bg-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Image
            src="/images/logo/ilnet-logo.png"
            alt="ILNET-TCHAD"
            width={120}
            height={85}
            className="h-12 w-auto"
          />
          <p className="text-blue-900 italic text-sm sm:text-base">
            Make your life easier with internet and TV
          </p>
        </div>
      </div>

      {/* Bas de page orange */}
      <div className="bg-orange-500">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
          <div>
            <p className="font-semibold mb-3">Pourquoi nous choisir ?</p>
            <ul className="space-y-1.5 text-sm text-orange-50">
              <li>Nous sommes compétents</li>
              <li>Nous offrons un service de Qualité</li>
              <li>Nous sommes disponibles 24h/7</li>
              <li>Nous sommes leader au Tchad</li>
              <li>Nos prix sont compétitifs</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3">ILNET TELECOM</p>
            <ul className="space-y-1.5 text-sm text-orange-50">
              <li><Link href="/#services" className="hover:text-white">Services</Link></li>
              <li><Link href="/#offres" className="hover:text-white">Offres</Link></li>
              <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3">Contacts</p>
            <ul className="space-y-1.5 text-sm text-orange-50">
              <li>sales@ilnet-telecoms.td</li>
              <li>noc@ilnet-telecoms.td</li>
              <li>+235 62 08 41 81</li>
              <li>+235 95 34 03 63</li>
              <li>+235 69 32 36 75</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-400">
          <p className="text-center text-orange-50 text-xs py-4">
            © Copyright {new Date().getFullYear()} | ILNET TELECOM
          </p>
        </div>
      </div>
    </footer>
  );
}
