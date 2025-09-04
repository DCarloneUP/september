// app/layout.tsx
import './globals.css';
import { DataProvider } from '@/components/DataContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing Data',
  description: 'Dashboard marketing multi-ambiente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-white">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
