import { Bell, MessageCircle, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search"
            className="w-full rounded-full border pl-9 pr-4 py-2 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
        <button className="rounded-full p-2 hover:bg-gray-100" aria-label="Messages">
          <MessageCircle className="h-5 w-5 text-gray-600" />
        </button>
        <button className="rounded-full p-2 hover:bg-gray-100" aria-label="Notifications">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
