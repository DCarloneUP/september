import Sidebar from '@/components/Sidebar'
import "@/app/globals.css";


export default function EnvironmentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { env: string }
}) {
  const env = params.env

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="text-sm text-gray-500 mb-2">Ambiente selezionato: <strong>{env}</strong></div>
        {children}
      </main>
    </div>
  )
}
