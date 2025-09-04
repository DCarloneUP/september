'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Settings } from 'lucide-react';

// helper inline per validare lo slug ambiente
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
    // wrapper: spinge a destra se c'è la sidebar e tiene i margini orizzontali
    <div className={`${ml} px-4 pt-3`}>
      {/* card “pillola” centrata */}
      <div className="mx-auto max-w-7xl rounded-xl border border-black/10 bg-white/70 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* titolo */}
          <div className="text-base sm:text-lg font-semibold text-gray-800">
            {showSidebarOffset ? `Ambiente: ${env}` : 'Seleziona ambiente'}
          </div>

          {/* azioni a destra */}
          <div className="flex items-center gap-2">
            {showSidebarOffset && (
              <Link
                href={`/${env}/settings`}
                className="inline-flex items-center rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-sm text-gray-700 hover:bg-white"
                title="Impostazioni"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            )}

            {/* avatar semplice */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700"
              title="Profilo utente"
            >
              A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
