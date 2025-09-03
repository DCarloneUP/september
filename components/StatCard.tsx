export default function StatCard({ label, value, sublabel }: { label: string; value: string | number; sublabel?: string }) {
  return (
    <div className="rounded-2xl border bg-white/70 p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}{sublabel ? ` · ${sublabel}` : ""}</div>
    </div>
  );
}
