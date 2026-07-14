export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Paramètres</h1>
      <div className="bg-white shadow rounded-lg p-6 max-w-xl">
        <div className="space-y-4">
          <div><p className="font-medium">🌙 Thème</p><p className="text-sm text-gray-500">Clair / Sombre</p></div>
          <div><p className="font-medium">🔔 Notifications</p><p className="text-sm text-gray-500">Paramètres de notification</p></div>
          <div><p className="font-medium">🌐 Langue</p><p className="text-sm text-gray-500">Français</p></div>
        </div>
      </div>
    </div>
  );
}