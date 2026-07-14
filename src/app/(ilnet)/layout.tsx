import React from "react";
import IlnetHeader from "@/components/ilnet/Header";
import IlnetFooter from "@/components/ilnet/Footer";

export default function IlnetHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Page publique : pas de vérification de connexion ici, elle est
  // accessible à tout le monde (visiteurs non connectés inclus).
  // Header et Footer sont communs à toutes les pages publiques
  // (accueil, services, contact).
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IlnetHeader />
      <main className="flex-1">{children}</main>
      <IlnetFooter />
    </div>
  );
}
