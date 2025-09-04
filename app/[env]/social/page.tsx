'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useData, slugToBrand } from '@/components/DataContext';

const BrandFollowersChart = dynamic(
  () => import('@/components/charts/BrandFollowersChart'),
  { ssr: false }
);

export default function SocialPage() {
  const { data } = useData();
  const env = (usePathname().split('/')[1] ||
    'upsystems') as 'upsystems' | 'teamtalent' | 'replan' | 'yourmerchandising';
  const brand = slugToBrand[env];

  const posts = useMemo(
    () => data.posts.filter((p) => p.brand === brand),
    [data.posts, brand]
  );

  const followerSeries = useMemo(() => {
    return data.followers
      .slice()
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((r) => ({
        month: r.month.slice(5),
        value:
          brand === 'Upsystems'
            ? r.Upsystems
            : brand === 'Teamtalent'
            ? r.Teamtalent
            : brand === 'Replan'
            ? r.Replan
            : r.Yourmerchandising,
      }));
  }, [data.followers, brand]);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Area Social</h1>

      <BrandFollowersChart data={followerSeries} />

      <div className="rounded-2xl border bg-white/70 p-4">
        <div className="mb-2 font-medium">Ultimi Post</div>
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Titolo</th>
              <th className="text-right">Impr.</th>
              <th className="text-right">Click</th>
              <th className="text-right">Data</th>
            </tr>
          </thead>
          <tbody>
            {posts
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.title}</td>
                  <td className="py-2 text-right">{p.impressions}</td>
                  <td className="py-2 text-right">{p.clicks}</td>
                  <td className="py-2 text-right">
                    {new Date(p.date).toLocaleDateString('it-IT')}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
