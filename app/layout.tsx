import "@/styles/globals.css";

export const metadata = {
  title: "Vibecoding Dashboard",
  description: "Dashboard interna – Vibecoding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}
