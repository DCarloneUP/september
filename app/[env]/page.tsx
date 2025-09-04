'use client';

import Link from 'next/link';
import StatCard from '@/components/StatCard';
import { usePathname } from 'next/navigation';
import { useData, slugToBrand } from '@/components/DataContext';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const SalesChart = dynamic(() => import('@/components/charts/SalesChart'), {
  ssr: false,
});

export default function Page() {
  const { data } = useData();
  const pathname = usePathname();
  const env = (pathname.split('/')[1] || 'upsystems') as
    | 'upsystems'
    | 'teamtalent'
    | 'replan'
    | 'yourmerchandising';
  const brand = slugToBrand[env];

  const brandPosts = useMemo(
    () => data.posts.filter((p) => p.brand === brand),
    [data.posts, brand]
  );
  const brandDem = useMemo(
    () => data.dem.filter((m) => m.brand === brand),
    [data.dem, brand]
  );

  const ctrMedio =
    brandDem.length === 0
      ? '0%'
      : Math.round(
          (brandDem.reduce((a, b) => a + (b.ctr || 0), 0) / brandDem.length) * 100
        ) + '%';

  const openMedio =
    brandDem.length === 0
      ? '0%'
      : Math.round(
          (brandDem.reduce((a, b) => a + (b.openRate || 0), 0) / brandDem.length) *
            100
        ) + '%';

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Home</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Post (totale)" value={brandPosts.length} />
        <StatCard label="DEM/Newsletter (totale)" value={brandDem.length} />
        <StatCard label="CTR medio DEM" value={ctrMedio} />
        <StatCard label="Open rate medio" value={openMedio} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        <div className="rounded-2xl border bg-white/70 p-4">
          <div className="mb-2 font-medium">Attività recenti</div>
          <ul className="text-sm text-gray-700 space-y-2">
            {brandPosts
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date))
              .slice(-5)
              .reverse()
              .map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span className="truncate pr-2">
                    <b>{p.brand}</b> – {p.title}
                  </span>
                  <span className="text-gray-500">
                    {new Date(p.date).toLocaleDateString('it-IT')}
                  </span>
                </li>
              ))}
          </ul>

          <div className="mt-3 text-right">
            <Link href={`/${env}/social`} className="text-brand-600 hover:underline text-sm">
              Vai a Social →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
