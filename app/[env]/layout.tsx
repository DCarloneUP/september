// app/[env]/layout.tsx
import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function EnvLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] lg:grid-cols-[288px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
          {children}
        </main>
      </div>
    </div>
  )
}
