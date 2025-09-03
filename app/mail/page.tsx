import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { recentDEM } from "@/lib/mock";

export default function MailPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] lg:grid-cols-[288px_1fr]">
      <Sidebar active="/mail" />
      <div className="flex flex-col">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">Mail Marketing</h1>

          <section className="rounded-2xl border bg-white/70 p-4">
            <div className="mb-2 font-medium">DEM & Newsletter inviate</div>
            <table className="w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left font-medium py-2">Data/Ora</th>
                  <th className="text-left font-medium">Brand</th>
                  <th className="text-left font-medium">Oggetto</th>
                  <th className="text-right font-medium">Audience</th>
                  <th className="text-right font-medium">Open</th>
                  <th className="text-right font-medium">CTR</th>
                </tr>
              </thead>
              <tbody>
                {recentDEM.map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="py-2">{m.sentAt}</td>
                    <td className="py-2">{m.brand}</td>
                    <td className="py-2">{m.subject}</td>
                    <td className="py-2 text-right">{m.audience}</td>
                    <td className="py-2 text-right">{Math.round(m.openRate * 100)}%</td>
                    <td className="py-2 text-right">{Math.round(m.ctr * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
