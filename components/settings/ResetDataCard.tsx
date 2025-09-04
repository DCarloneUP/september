'use client';

import { useState } from 'react';
import { useData } from '@/components/DataContext';

export default function ResetDataCard() {
  const { resetData } = useData();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="rounded-2xl border bg-white/5 p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-2">Pulizia dati</h3>
      <p className="text-sm opacity-80 mb-4">
        Cancella i dati locali e ripristina i mock iniziali. Operazione irreversibile.
      </p>

      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
        >
          Svuota & Ripristina
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => { resetData(); setConfirm(false); }}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
          >
            Conferma
          </button>
          <button
            onClick={() => setConfirm(false)}
            className="px-4 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition"
          >
            Annulla
          </button>
        </div>
      )}
    </div>
  );
}
