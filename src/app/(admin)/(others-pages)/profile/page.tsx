"use client";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 Mon profil</h1>
      <div className="bg-white shadow rounded-lg p-6 max-w-xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Nom</label>
            <p className="font-medium">Bienvenu</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">bienvenu@ilnet-tchad.com</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Rôle</label>
            <p className="font-medium">Administrateur</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Téléphone</label>
            <p className="font-medium">+235 XX XX XX XX</p>
          </div>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          Modifier le profil
        </button>
      </div>
    </div>
  );
}