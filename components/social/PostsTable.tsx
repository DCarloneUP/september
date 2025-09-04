'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Eye, Pencil, Trash2, Linkedin } from 'lucide-react';
import { slugToBrand, type Post } from '@/components/DataContext';
import EditPostModal from './EditPostModal';
import PreviewPostModal from './PreviewPostModal';

type Props = {
  posts: Post[];
  onCreate?: () => void;
};

function fmtDate(s: string) {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('it-IT');
}

function pct(n?: number) {
  if (typeof n !== 'number' || !isFinite(n)) return '—';
  return `${Math.round(n * 100)}%`;
}

export default function PostsTable({ posts }: Props) {
  const pathname = usePathname();
  const env = pathname.split('/').filter(Boolean)[0] as keyof typeof slugToBrand | undefined;
  const brand = env ? slugToBrand[env] : undefined;

  const rows = useMemo(
    () => posts.filter((p) => (brand ? p.brand === brand : true)),
    [posts, brand]
  );

  const [editing, setEditing] = useState<Post | null>(null);
  const [previewing, setPreviewing] = useState<Post | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <section className="rounded-2xl border bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ultimi Post</h2>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800"
        >
          Aggiungi post
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500">
            <tr className="text-left">
              <th className="py-2 pr-3">Copy</th>
              <th className="py-2 pr-3">Canale</th>
              <th className="py-2 pr-3">Formato</th>
              <th className="py-2 pr-3">Data pubbl.</th>
              <th className="py-2 pr-3">Impressioni</th>
              <th className="py-2 pr-3">Utenti raggiunti</th>
              <th className="py-2 pr-3">Reazioni</th>
              <th className="py-2 pr-3">% interesse</th>
              <th className="py-2 pl-1 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const interest = typeof p.interestPct === 'number'
                ? p.interestPct
                : (p.impressions > 0 ? p.clicks / p.impressions : undefined);
              return (
                <tr key={p.id} className="border-t align-top">
                  <td className="py-3 pr-3 max-w-xl">
                    <div className="line-clamp-3 whitespace-pre-wrap">{p.title}</div>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 text-sky-700">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </span>
                  </td>
                  <td className="py-3 pr-3 capitalize">{p.format ?? 'image'}</td>
                  <td className="py-3 pr-3">{fmtDate(p.date)}</td>
                  <td className="py-3 pr-3">{p.impressions?.toLocaleString('it-IT') ?? '—'}</td>
                  <td className="py-3 pr-3">{p.reach?.toLocaleString('it-IT') ?? '—'}</td>
                  <td className="py-3 pr-3">{p.reactions?.toLocaleString('it-IT') ?? '—'}</td>
                  <td className="py-3 pr-3">{pct(interest)}</td>
                  <td className="py-3 pl-1">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewing(p)}
                        className="rounded-md border px-2 py-1 hover:bg-gray-50"
                        title="Anteprima"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditing(p)}
                        className="rounded-md border px-2 py-1 hover:bg-gray-50"
                        title="Modifica"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <DeleteButton id={p.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="py-10 text-center text-gray-500">
                  Nessun post presente per questo ambiente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modali */}
      {(editing || adding) && (
        <EditPostModal post={adding ? undefined : editing!} onClose={() => { setEditing(null); setAdding(false); }} />
      )}
      {previewing && <PreviewPostModal post={previewing} onClose={() => setPreviewing(null)} />}
    </section>
  );
}

function DeleteButton({ id }: { id: string }) {
  const { setData } = require('@/components/DataContext').useData();
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={() => {
        if (!confirm('Eliminare questo post?')) return;
        setBusy(true);
        setData((d: any) => ({ ...d, posts: d.posts.filter((p: Post) => p.id !== id) }));
        setBusy(false);
      }}
      disabled={busy}
      className="rounded-md border px-2 py-1 hover:bg-red-50 disabled:opacity-50"
      title="Elimina"
    >
      <Trash2 className="h-4 w-4 text-red-600" />
    </button>
  );
}
