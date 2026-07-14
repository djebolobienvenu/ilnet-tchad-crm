"use client";

import React, { useEffect, useState } from "react";

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

export default function AgentProfilePage() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">👤 Mon profil</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <p className="text-xs text-gray-400 uppercase">Nom</p>
          <p className="text-gray-800 font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase">Email</p>
          <p className="text-gray-800 font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase">Rôle</p>
          <p className="text-gray-800 font-medium">Agent Support</p>
        </div>
      </div>
    </div>
  );
}
