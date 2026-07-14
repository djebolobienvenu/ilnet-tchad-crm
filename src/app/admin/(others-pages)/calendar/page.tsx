"use client";

export default function CalendarPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📅 Calendrier</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500 mb-4">📅 Gérez vos rendez-vous et événements</p>
        
        <div className="grid grid-cols-7 gap-2 mt-4">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className="text-center font-medium text-sm text-gray-600 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div key={day} className="text-center text-sm py-2 border rounded-lg hover:bg-blue-50 cursor-pointer">
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}