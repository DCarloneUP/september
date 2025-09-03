import { Home, Package, Layers, Store, Wallet, Settings, PlusCircle, LogOut } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/categories", label: "Categories", icon: Layers },
  { href: "/stores", label: "Stores", icon: Store },
  { href: "/finances", label: "Finances", icon: Wallet },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ active = "/" }: { active?: string }) {
  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-white/70 backdrop-blur border-r">
      <div className="px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-500" />
          <span className="font-semibold">Vibecoding</span>
        </Link>
      </div>
      <nav className="px-2 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
                isActive
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className={clsx("h-4 w-4", isActive && "text-white")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-3">
        <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
          <PlusCircle className="h-4 w-4" />
          Add product
        </button>
        <button className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
