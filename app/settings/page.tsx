import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function SettingsPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] lg:grid-cols-[288px_1fr]">
      <Sidebar active="/settings" />
      <div className="flex flex-col">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-4 text-sm text-gray-700">
            Questa sezione sarà disponibile a breve. Da qui potrai configurare i parametri dell’app.
          </p>
        </main>
      </div>
    </div>
  );
}
