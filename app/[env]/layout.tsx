// app/[env]/layout.tsx
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function EnvLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 px-4 py-6">{children}</main>
      </div>
    </>
  );
}
