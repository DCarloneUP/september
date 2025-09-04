'use client';

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("it");

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Impostazioni</h1>

      {/* Tema */}
      <section className="p-4 border rounded-lg bg-white">
        <h2 className="font-medium mb-2">Tema</h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox"
          />
          <span>Modalità Scura</span>
        </label>
      </section>

      {/* Notifiche */}
      <section className="p-4 border rounded-lg bg-white">
        <h2 className="font-medium mb-2">Notifiche</h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="form-checkbox"
          />
          <span>Attiva notifiche</span>
        </label>
      </section>

      {/* Lingua */}
      <section className="p-4 border rounded-lg bg-white">
        <h2 className="font-medium mb-2">Lingua</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300"
        >
          <option value="it">Italiano</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </section>

      {/* Salva */}
      <div className="text-right">
        <button
          onClick={() => alert('Impostazioni salvate!')}
          className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700"
        >
          Salva modifiche
        </button>
      </div>
    </main>
  );
}
