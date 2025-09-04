import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { recentPosts } from "@/lib/mock";
import dynamic from "next/dynamic";

const FollowersChart = dynamic(() => import("@/components/charts/FollowersChart"), {
  ssr: false,
});

export default function SocialPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] lg:grid-cols-[288px_1fr]">
      <Sidebar active="/social" />
      <div className="flex flex-col">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">Social</h1>
          <section className="rounded-2xl border bg-white/70 p-4">
            <div className="mb-2 font-medium">Elenco post pubblicati</div>
            <table className="w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left font-medium py-2">Data</th>
                  <th className="text-left font-medium">Brand</th>
                  <th className="text-left font-medium">Titolo</th>
                  <th className="text-right font-medium">Impr.</th>
                  <th className="text-right font-medium">Click</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2">
                      {new Date(p.date).toLocaleDateString("it-IT")}
                    </td>
                    <td className="py-2">{p.brand}</td>
                    <td className="py-2">{p.title}</td>
                    <td className="py-2 text-right">{p.impressions}</td>
                    <td className="py-2 text-right">{p.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="rounded-2xl border bg-white/70 p-4">
            <div className="mb-2 font-medium">
              Dati demografici followers (mese per mese)
            </div>
              <FollowersChart />
          </section>
        </main>
      </div>
    </div>
  );
}
