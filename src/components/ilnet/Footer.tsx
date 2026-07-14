import React from "react";
import Link from "next/link";

export default function IlnetFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-semibold text-gray-800 mb-2">ILNET-TCHAD</p>
          <p className="text-sm text-gray-500">Make your life easy with internet !</p>
        </div>

        <div>
          <p className="font-semibold text-gray-800 mb-2 text-sm">Navigation</p>
          <ul className="space-y-1 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-blue-600">Accueil</Link></li>
            <li><Link href="/service" className="hover:text-blue-600">Services</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-800 mb-2 text-sm">Nous contacter</p>
          <ul className="space-y-1 text-sm text-gray-500">
            <li>N&apos;Djamena, Tchad</li>
            <li>+235 66 00 00 00</li>
            <li>contact@ilnet-tchad.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4">
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ILNET-TCHAD. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
