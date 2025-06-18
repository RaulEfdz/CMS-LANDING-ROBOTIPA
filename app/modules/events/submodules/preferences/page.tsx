"use client";

import SettingsPanel, { SettingsData } from "./components/c";

// Página principal que une todos los componentes
export default function Preferences() {
  const handleSave = (settings: SettingsData) => {
    console.log("Settings guardadas:", settings);
    // Aquí puedes implementar la lógica de guardado
  };

  return (
    <div className="preferences-page py-10">
      <h1>Preferencias de Eventos</h1>
      <SettingsPanel onSave={handleSave} />
    </div>
  );
}
