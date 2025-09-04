'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Calendar, Mail, BarChart, Settings } from 'lucide-react';
import { isValidEnvSlug } from '@/lib/env';

const routes = [
  { href: '', label: 'Home', icon: Home },
  { href: 'social', label: 'Social', icon: BarChart },
  { href: 'mail', label: 'Mail Marketing', icon: Mail },
  { href: 'calendar', label: 'Calendario', icon: Calendar },
  { href: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const env = pathSegments[0]; // su /upsystems/..., env = 'upsystems'

  // Non mostrare la sidebar se non siamo dentro un env valido (es. /select-env)
  if (!isValidEnvSlug(env)) return null;

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4">
      <h1 className="text-xl font-semibold mb-6">Marketing Data</h1>
      <nav className="flex flex-col space-y-2">
        {routes.map(({ href, label, icon: Icon }) => {
          const routePath = href ? `/${env}/${href}` : `/${env}`;
          const isActive = pathname === routePath;

          return (
            <Link
              key={href}
              href={routePath}
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition',
                isActive && 'bg-gray-700'
              )}
            >
              <Icon className="w-4 h-4 mr-3" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
