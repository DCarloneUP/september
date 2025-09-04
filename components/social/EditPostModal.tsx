'use client';

import { useEffect, useState } from 'react';
import { useData, type Post, slugToBrand } from '@/components/DataContext';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

type Props = {
  post?: Post;          // se assente => crea nuovo
  onClose: () => void;
};

export default function EditPostModal({ post, onClose }: Props) {
  const { setData } = useData();
  const pathname = usePathname();
  const env = pathname.split('/').filter(Boolean)[0] as keyof typeof slugToBrand | undefined;
  const brand = env ? slugToBrand[env] : 'Upsystems';

  const [form, setForm] = useState<Post>(() => ({
    id: post?.id ?? cryptoId(),
    brand: post?.brand ?? brand,
    title: post?.title ?? '',
    date: post?.date ?? new Date().toISOString().slice(0, 10),
    impressions: post?.impressions ?? 0,
    clicks: post?.clicks ?? 0,
    channel: post?.channel ?? 'linkedin',
    format: post?.format ?? 'image',
    reach: post?.reach,
    reactions: post?.reactions,
    interestPct: post?.interestPct,
    mediaUrl: post?.mediaUrl,
  }));

  useEffect(() => {
    // se cambia post (unlikely), sync form
    if (post) setForm(post);
  }, [post]);

  function save() {
    setData((d) => {
      const exists = d.posts.some((p) => p.id === form.id);
      const posts = exists
        ? d.posts.map((p) => (p.id === form.id ? { ...p, ...form } : p))
        : [{ ...form }, ...d.posts];
      return { ...d, posts };
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="text-lg font-semibold">{post ? 'Modifica post' : 'Nuovo post'}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-black/5"><X className="h-5 w-5" /></button>
        </div>

        <div className="grid gap-4 px-5 py-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Copy</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2"
              rows={4}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Data pubblicazione</label>
            <input
              type="date"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.date.slice(0, 10)}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Canale</label>
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2 capitalize"
              value={form.channel ?? 'linkedin'}
              onChange={(e) => setForm({ ...form, channel: e.target.value as any })}
            >
              <option>linkedin</option>
              <option>instagram</option>
              <option>facebook</option>
              <option>x</option>
              <option>youtube</option>
              <option>tiktok</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Formato</label>
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2 capitalize"
              value={form.format ?? 'image'}
              onChange={(e) => setForm({ ...form, format: e.target.value as any })}
            >
              <option>image</option>
              <option>carousel</option>
              <option>video</option>
              <option>repost</option>
              <option>text</option>
              <option>link</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Impressioni</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.impressions}
              onChange={(e) => setForm({ ...form, impressions: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Utenti raggiunti</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.reach ?? 0}
              onChange={(e) => setForm({ ...form, reach: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Reazioni</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.reactions ?? 0}
              onChange={(e) => setForm({ ...form, reactions: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">% interesse (0..1)</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.interestPct ?? ''}
              onChange={(e) =>
                setForm({ ...form, interestPct: e.target.value === '' ? undefined : Number(e.target.value) })
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">URL immagine (anteprima)</label>
            <input
              type="url"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.mediaUrl ?? ''}
              onChange={(e) => setForm({ ...form, mediaUrl: e.target.value || undefined })}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t px-5 py-3">
          <button onClick={onClose} className="rounded-lg border px-3 py-2 hover:bg-black/5">Annulla</button>
          <button onClick={save} className="rounded-lg bg-gray-900 px-3 py-2 text-white hover:bg-gray-800">
            Salva
          </button>
        </div>
      </div>
    </div>
  );
}

function cryptoId() {
  return Math.random().toString(36).slice(2);
}
