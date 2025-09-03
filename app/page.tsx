import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import dynamic from "next/dynamic";

const SalesChart = dynamic(() => import("@/components/charts/SalesChart"), { ssr: false });

export default function Page() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] lg:grid-cols-[288px_1fr]">
      <Sidebar active="/" />
      <div className="flex flex-col">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">Recent activity</h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="New items" value={741} sublabel="Qty" />
            <StatCard label="New orders" value={123} sublabel="Qty" />
            <StatCard label="Refunds" value={12} sublabel="Qty" />
            <StatCard label="Messages" value={1} sublabel="Qty" />
            <StatCard label="Groups" value={4} sublabel="Qty" />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <div className="rounded-2xl border bg-white/70 p-4">
              <div className="mb-2 font-medium">Top item categories</div>
              <div className="grid grid-cols-3 gap-3">
                {["T-shirt","Hat","Bag","Shoes","Backpack","Glasses"].map((x) => (
                  <div key={x} className="aspect-square rounded-2xl border flex items-center justify-center text-sm text-gray-700">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-white/70 p-4">
              <div className="mb-2 font-medium">Stock numbers</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex justify-between"><span>Low stock items</span><span>12</span></li>
                <li className="flex justify-between"><span>Item categories</span><span>6</span></li>
                <li className="flex justify-between"><span>Refunded items</span><span>1</span></li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-white/70 p-4">
              <div className="mb-2 font-medium">Stores list</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex justify-between"><span>Manchester, UK</span><span>23 employees · 308 items</span></li>
                <li className="flex justify-between"><span>Yorkshire, UK</span><span>11 employees · 291 items</span></li>
                <li className="flex justify-between"><span>Hull, UK</span><span>5 employees · 41 items</span></li>
                <li className="flex justify-between"><span>Leicester, UK</span><span>16 employees · 261 items</span></li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
