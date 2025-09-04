'use client';

import { useState } from 'react';
import { useData } from '@/components/DataContext';

interface User {
  id: number;
  name: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  env: string;
}

interface Environment {
  id: number;
  name: string;
  active: boolean;
}

export default function SettingsPage() {
  const { importFile, exportJson } = useData();

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice', role: 'Admin', env: 'upsystems' },
    { id: 2, name: 'Bob', role: 'Editor', env: 'teamtalent' },
  ]);

  const [environments, setEnvironments] = useState<Environment[]>([
    { id: 1, name: 'upsystems', active: true },
    { id: 2, name: 'teamtalent', active: true },
    { id: 3, name: 'yourmerchandising', active: false },
    { id: 4, name: 'replan', active: true },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Viewer' as User['role'],
    env: '',
  });

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>('');

  const handleAddUser = () => {
    if (!newUser.name || !newUser.env) return;
    setUsers((u) => [...u, { ...newUser, id: Date.now() } as User]);
    setNewUser({ name: '', role: 'Viewer', env: '' });
  };

  const toggleEnv = (id: number) => {
    setEnvironments((prev) =>
      prev.map((env) => (env.id === id ? { ...env, active: !env.active } : env))
    );
  };

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      await importFile(file);
    } catch (error: any) {
      setErr(error?.message || 'Errore durante import');
    } finally {
      e.target.value = '';
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Impostazioni</h1>

      {/* Import / Export */}
      <section className="rounded-2xl border bg-white/70 p-4">
        <h2 className="text-lg font-medium mb-4">Importa / Esporta dati</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="file"
            accept=".json,.csv,.xlsx,.xls"
            onChange={handleImport}
            className="border rounded-md px-3 py-2"
            disabled={busy}
          />
          <button
            onClick={exportJson}
            className="bg-gray-900 text-white px-4 py-2 rounded-md disabled:opacity-60"
            disabled={busy}
          >
            Esporta dataset (JSON)
          </button>
        </div>

        {busy && <p className="text-sm text-gray-500 mt-2">Import in corso…</p>}
        {err && <p className="text-sm text-red-600 mt-2">{err}</p>}

        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Formati supportati:</p>
          <ul className="list-disc pl-5">
            <li>JSON con struttura: {"{ posts:[], dem:[], calendar:[], followers:[] }"}</li>
            <li>CSV (singola entità per file: <i>posts</i> / <i>dem</i> / <i>calendar</i> / <i>followers</i>)</li>
            <li>XLSX con fogli: <b>posts</b>, <b>dem</b>, <b>calendar</b>, <b>followers</b></li>
          </ul>
        </div>
      </section>

      {/* Ambienti configurabili */}
      <section className="rounded-2xl border bg-white/70 p-4">
        <h2 className="text-lg font-medium mb-4">Ambienti disponibili</h2>
        <ul className="space-y-2">
          {environments.map((env) => (
            <li key={env.id} className="flex items-center justify-between">
              <span>{env.name}</span>
              <button
                onClick={() => toggleEnv(env.id)}
                className={`text-sm px-3 py-1 rounded-md ${
                  env.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {env.active ? 'Attivo' : 'Disattivato'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Gestione utenti (mock locale) */}
      <section className="rounded-2xl border bg-white/70 p-4">
        <h2 className="text-lg font-medium mb-4">Gestione utenti</h2>

        <table className="w-full text-sm mb-6">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Nome</th>
              <th className="text-left">Ruolo</th>
              <th className="text-left">Ambiente</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-2">{u.name}</td>
                <td>{u.role}</td>
                <td>{u.env}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm">Nome</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border px-2 py-1 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Ruolo</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
              className="border px-2 py-1 rounded-md"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Ambiente</label>
            <select
              value={newUser.env}
              onChange={(e) => setNewUser({ ...newUser, env: e.target.value })}
              className="border px-2 py-1 rounded-md"
            >
              <option value="">Seleziona</option>
              {environments.map((env) => (
                <option key={env.id} value={env.name}>
                  {env.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddUser}
            className="bg-gray-900 text-white px-4 py-2 rounded-md"
          >
            Aggiungi
          </button>
        </div>
      </section>
    </main>
  );
}
