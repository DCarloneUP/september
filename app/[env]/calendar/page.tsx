'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useData, slugToBrand } from '@/components/DataContext';

export default function CalendarPage() {
  const { data } = useData();
  const env = (usePathname().split('/')[1] ||
    'upsystems') as 'upsystems' | 'teamtalent' | 'replan' | 'yourmerchandising';
  const brand = slugToBrand[env];

  const rows = useMemo(
    () =>
      data.calendar
        .filter((c) => c.brand === brand)
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date)),
    [data.calendar, brand]
  );

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Calendario Editoriale</h1>

      <div className="rounded-2xl border bg-white/70 p-4">
        <div className="mb-2 font-medium">Attività pianificate</div>
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Data</th>
              <th className="text-left">Tipo</th>
              <th className="text-left">Titolo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.date}-${i}`} className="border-t">
                <td className="py-2">
                  {new Date(r.date).toLocaleDateString('it-IT')}
                </td>
                <td className="py-2 uppercase">{r.type}</td>
                <td className="py-2">{r.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
