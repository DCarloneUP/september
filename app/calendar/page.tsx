import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { calendarItems } from "@/lib/mock";

function getMonthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: (Date | null)[] = [];
  const startWeekday = (first.getDay() + 6) % 7; // Monday=0
  for (let i = 0; i < startWeekday; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

const now = new Date();
const Y = now.getFullYear();
const M = now.getMonth();
const days = getMonthDays(Y, M);

export default function CalendarPage() {
  const isoMonth = `${Y}-${String(M + 1).padStart(2, "0")}`;
  const items = calendarItems.filter((i) => i.date.startsWith(isoMonth));

  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] lg:grid-cols-[288px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">Calendario</h1>

          <div className="rounded-2xl border bg-white/70 p-4">
            <div className="grid grid-cols-7 gap-3 text-sm">
              {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((d) => (
                <div key={d} className="font-medium text-gray-500">
                  {d}
                </div>
              ))}

              {days.map((d, idx) => {
                const dayIso = d
                  ? `${Y}-${String(M + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
                  : "";
                const dayItems = d ? items.filter((i) => i.date === dayIso) : [];
                return (
                  <div key={idx} className="min-h-[96px] rounded-xl border p-2 bg-white">
                    <div className="text-xs text-gray-500">{d ? d.getDate() : ""}</div>
                    <div className="mt-1 space-y-1">
                      {dayItems.map((i, k) => (
                        <div
                          key={k}
                          className={`px-2 py-1 rounded-lg text-xs ${
                            i.type === "dem"
                              ? "bg-brand-100 text-brand-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <b>{i.brand}</b> · {i.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
