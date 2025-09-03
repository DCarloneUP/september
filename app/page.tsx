import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import dynamic from "next/dynamic";
import Link from "next/link";
import { recentPosts, recentDEM } from "@/lib/mock";

const SalesChart = dynamic(() => import("@/components/charts/SalesChart"), { ssr: false });

export default function Page() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] lg:grid-cols-[288px_1fr]">
      <Sidebar active="/" />
      <div className="flex flex-col">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">Home</h1>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Post ultimi 7gg" value={recentPosts.length} />
            <StatCard label="DEM/Newsletter ultimi 7gg" value={recentDEM.length} />
            <StatCard
              label="CTR medio DEM"
              value={
                Math.round(
                  (recentDEM.reduce((a, b) => a + b.ctr, 0) / recentDEM.length) * 100
                ) + "%"
              }
            />
            <StatCard
              label="Open rate medio"
              value={
                Math.round(
                  (recentDEM.reduce((a, b) => a + b.openRate, 0) / recentDEM.length) * 100
                ) + "%"
              }
            />
          </section>

          {/* Chart + Attività recenti */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <div className="rounded-2xl border bg-white/70 p-4">
              <div className="mb-2 font-medium">Attività recenti</div>
              <ul className="text-sm text-gray-700 space-y-2">
                {recentPosts.slice(0, 4).map((p) => (
                  <li key={p.id} className="flex justify-between">
                    <span className="truncate pr-2">
                      🟣 <b>{p.brand}</b> – {p.title}
                    </span>
                    <span className="text-gray-500">
                      {new Date(p.date).toLocaleDateString("it-IT")}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-right">
                <Link href="/social" className="text-brand-600 hover:underline text-sm">
                  Vai a Social →
                </Link>
              </div>
            </div>
          </section>

          {/* Tabelle: Post e DEM */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-white/70 p-4">
              <div className="mb-2 font-medium">Ultimi post</div>
              <table className="w-full text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="text-left font-medium py-2">Brand</th>
                    <th className="text-left font-medium">Titolo</th>
                    <th className="text-right font-medium">Impr.</th>
                    <th className="text-right font-medium">Click</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="py-2">{p.brand}</td>
                      <td className="py-2">{p.title}</td>
                      <td className="py-2 text-right">{p.impressions}</td>
                      <td className="py-2 text-right">{p.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border bg-white/70 p-4">
              <div className="mb-2 font-medium">Ultime DEM inviate</div>
              <table className="w-full text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="text-left font-medium py-2">Brand</th>
                    <th className="text-left font-medium">Oggetto</th>
                    <th className="text-right font-medium">Audience</th>
                    <th className="text-right font-medium">Open</th>
                    <th className="text-right font-medium">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDEM.map((m) => (
                    <tr key={m.id} className="border-t">
                      <td className="py-2">{m.brand}</td>
                      <td className="py-2">{m.subject}</td>
                      <td className="py-2 text-right">{m.audience}</td>
                      <td className="py-2 text-right">
                        {Math.round(m.openRate * 100)}%
                      </td>
                      <td className="py-2 text-right">{Math.round(m.ctr * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 text-right">
                <Link href="/mail" className="text-brand-600 hover:underline text-sm">
                  Vai a Mail Marketing →
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
