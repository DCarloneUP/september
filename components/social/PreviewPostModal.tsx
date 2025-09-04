'use client';

import Image from 'next/image';
import { X, Linkedin } from 'lucide-react';
import { type Post } from '@/components/DataContext';

export default function PreviewPostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const interest = typeof post.interestPct === 'number'
    ? post.interestPct
    : (post.impressions > 0 ? post.clicks / post.impressions : undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="grid w-full max-w-5xl gap-4 md:grid-cols-[2fr,1fr]">
        {/* Mock LinkedIn */}
        <div className="rounded-2xl bg-white shadow-lg">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <div className="inline-flex items-center gap-2 text-sky-700">
              <Linkedin className="h-5 w-5" /> <span className="text-sm font-medium">LinkedIn preview</span>
            </div>
            <button onClick={onClose} className="rounded p-1 hover:bg-black/5"><X className="h-5 w-5" /></button>
          </div>

          <div className="px-5 py-4">
            {/* Copy */}
            <div className="whitespace-pre-wrap text-[15px] leading-6">{post.title}</div>

            {/* Media */}
            {post.mediaUrl && (
              <div className="mt-4 overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.mediaUrl} alt="" className="h-auto w-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-2xl bg-white p-4 shadow-lg">
          <h4 className="mb-3 text-sm font-semibold text-gray-700">Statistiche & note</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="text-gray-500">Data:</span> <span>{new Date(post.date).toLocaleDateString('it-IT')}</span></li>
            <li><span className="text-gray-500">Formato:</span> <span className="capitalize">{post.format ?? 'image'}</span></li>
            <li><span className="text-gray-500">Impressioni:</span> <span>{post.impressions?.toLocaleString('it-IT') ?? '—'}</span></li>
            <li><span className="text-gray-500">Utenti raggiunti:</span> <span>{post.reach?.toLocaleString('it-IT') ?? '—'}</span></li>
            <li><span className="text-gray-500">Reazioni:</span> <span>{post.reactions?.toLocaleString('it-IT') ?? '—'}</span></li>
            <li><span className="text-gray-500">% interesse:</span> <span>{interest != null ? `${Math.round(interest * 100)}%` : '—'}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
