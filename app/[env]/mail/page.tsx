'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useData, slugToBrand } from '@/components/DataContext';

export default function MailPage() {
  const { data } = useData();
  const env = (usePathname().split('/')[1] ||
    'upsystems') as 'upsystems' | 'teamtalent' | 'replan' | 'yourmerchandising';
  const brand = slugToBrand[env];

  const items = useMemo(
    () =>
      data.dem
        .filter((m) => m.brand === brand)
        .slice()
        .sort((a, b) => (a.sentAt || '').localeCompare(b.sentAt || ''))
        .reverse(),
    [data.dem, brand]
  );

  const ctrMedio =
    items.length === 0
      ? '0%'
      : Math.round(
          (items.reduce((a, b) => a + (b.ctr || 0), 0) / items.length) * 100
        ) + '%';

  const openMedio =
    items.length === 0
      ? '0%'
      : Math.round(
          (items.reduce((a, b) => a + (b.openRate || 0), 0) / items.length) * 100
        ) + '%';

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Mail Marketing</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border bg-white/70 p-4">
          <div className="text-2xl font-semibold">{items.length}</div>
          <div className="text-sm text-gray-500">DEM/Newsletter</div>
        </div>
        <div className="rounded-2xl border bg-white/70 p-4">
          <div className="text-2xl font-semibold">{openMedio}</div>
          <div className="text-sm text-gray-500">Open rate medio</div>
        </div>
        <div className="rounded-2xl border bg-white/70 p-4">
          <div className="text-2xl font-semibold">{ctrMedio}</div>
          <div className="text-sm text-gray-500">CTR medio</div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white/70 p-4">
        <div className="mb-2 font-medium">Elenco DEM/Newsletter</div>
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Oggetto</th>
              <th className="text-right">Audience</th>
              <th className="text-right">Open</th>
              <th className="text-right">CTR</th>
              <th className="text-right">Inviata</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="py-2">{m.subject}</td>
                <td className="py-2 text-right">{m.audience}</td>
                <td className="py-2 text-right">{Math.round((m.openRate || 0) * 100)}%</td>
                <td className="py-2 text-right">{Math.round((m.ctr || 0) * 100)}%</td>
                <td className="py-2 text-right">
                  {new Date(m.sentAt).toLocaleString('it-IT')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
