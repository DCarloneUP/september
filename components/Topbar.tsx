'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Settings, User } from 'lucide-react';

// helper semplice inline: validazione env
const ENV_SLUGS = ['upsystems', 'teamtalent', 'replan', 'yourmerchandising'] as const;
type EnvSlug = typeof ENV_SLUGS[number];
function isValidEnvSlug(s: string | undefined | null): s is EnvSlug {
  return !!s && (ENV_SLUGS as readonly string[]).includes(s);
}

export default function Topbar() {
  const pathname = usePathname();
  const env = pathname.split('/').filter(Boolean)[0];

  const showSidebarOffset = isValidEnvSlug(env);
  const ml = showSidebarOffset ? 'ml-64' : '';

  return (
    <header
      className={`h-14 flex items-center justify-between px-4 bg-white/70 backdrop-blur shadow-sm ${ml}`}
    >
      {/* Brand + pagina corrente */}
      <div className="text-lg font-semibold text-gray-800">
        {showSidebarOffset ? `Ambiente: ${env}` : 'Seleziona ambiente'}
      </div>

      {/* Icone a destra */}
      <div className="flex items-center space-x-4">
        {/* Icona Settings solo se env valido */}
        {showSidebarOffset && (
          <Link
            href={`/${env}/settings`}
            className="text-gray-600 hover:text-gray-800 transition"
            title="Impostazioni"
          >
            <Settings className="w-5 h-5" />
          </Link>
        )}

        {/* Avatar utente */}
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold cursor-pointer"
            title="Profilo utente"
          >
            A
          </div>
          {/* TODO: dropdown menu utente */}
        </div>
      </div>
    </header>
  );
}
