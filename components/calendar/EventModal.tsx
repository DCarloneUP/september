'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useData, type CalendarItem } from '@/components/DataContext';

export default function EventModal({
  initial,
  onClose,
}: {
  initial: CalendarItem;
  onClose: () => void;
}) {
  const isNew = !initial.id;
  const { setData } = useData();

  const [form, setForm] = useState<CalendarItem>({
    ...initial,
    id: initial.id || cryptoId(),
    type: initial.type || 'post',
  });

  function save() {
    setData((d) => {
      const exists = d.calendar.some((c) => c.id === form.id);
      const calendar = exists
        ? d.calendar.map((c) => (c.id === form.id ? form : c))
        : [...d.calendar, form];
      return { ...d, calendar };
    });
    onClose();
  }

  function del() {
    if (!confirm('Eliminare questa attività?')) return;
    setData((d) => ({ ...d, calendar: d.calendar.filter((c) => c.id !== form.id) }));
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="text-lg font-semibold">{isNew ? 'Nuova attività' : 'Modifica attività'}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Data</label>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.date.slice(0, 10)}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tipo</label>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2 capitalize"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="post">Post</option>
                <option value="dem">DEM</option>
                <option value="event">Evento</option>
                <option value="other">Altro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Titolo</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-5 py-3">
          {!isNew ? (
            <button onClick={del} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 hover:bg-red-100">
              Elimina
            </button>
          ) : <span />}

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="rounded-lg border px-3 py-2 hover:bg-black/5">Annulla</button>
            <button onClick={save} className="rounded-lg bg-gray-900 px-3 py-2 text-white hover:bg-gray-800">Salva</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cryptoId() {
  return Math.random().toString(36).slice(2);
}
