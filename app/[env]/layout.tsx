// app/[env]/layout.tsx
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import React from 'react';

export default function EnvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar a larghezza fissa */}
      <aside className="w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* Colonna principale: Topbar + Page */}
      <div className="flex-1 flex flex-col">
        <Topbar /> {/* niente position: fixed */}
        <main className="flex-1 px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
