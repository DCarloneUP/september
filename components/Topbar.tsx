'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Settings, User } from 'lucide-react';

export default function Topbar() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const env = pathSegments[1] || '';

  return (
    <header className="flex justify-between items-center h-16 px-6 border-b border-gray-200 bg-white/70 backdrop-blur-md z-10">
      {/* Brand + pagina corrente */}
      <div className="text-lg font-semibold text-gray-800">
        {env ? `Ambiente: ${env}` : 'Dashboard'}
      </div>

      {/* Icone a destra */}
      <div className="flex items-center space-x-4">
        {/* Icona Settings */}
        <Link
          href={`/${env}/settings`}
          className="text-gray-600 hover:text-gray-800 transition"
          title="Impostazioni"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* Avatar utente */}
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold cursor-pointer"
            title="Profilo utente"
          >
            A
          </div>
          {/* In futuro: dropdown menu qui */}
        </div>
      </div>
    </header>
  );
}
