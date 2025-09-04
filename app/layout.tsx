// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/components/DataContext';

export const metadata: Metadata = {
  title: 'Marketing Data',
  description: 'Dashboard marketing multi-ambiente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-gradient-to-b from-purple-50 to-white">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
