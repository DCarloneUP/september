# Vibecoding Dashboard – Next.js (Vercel-ready)

Dashboard moderna con:
- Next.js (App Router)
- Tailwind CSS
- Lucide icons
- Recharts (grafici client-only)

## Deploy veloce (senza terminale)
1. Crea una repo vuota su GitHub (es. `vibecoding-dashboard`).
2. Carica qui dentro TUTTI i file di questo progetto (Add file → Upload files).
3. Vai su **Vercel → New Project → Import GitHub Repository**.
   - Framework: **Next.js**
   - Build command: `next build` (default)
   - Node version: **20**
4. **Deploy**.

## Variabili (facoltative)
Copia `.env.example` in `.env` e personalizza. Per ora non servono.

## Modifica contenuti
- Testi e menu: `components/Sidebar.tsx`, `components/Topbar.tsx`
- Box statistiche: `app/page.tsx`
- Chart: `components/charts/SalesChart.tsx` (usa dati finti in `lib/mock.ts`)
