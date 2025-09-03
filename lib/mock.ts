export type Brand = "Upsystems" | "Teamtalent" | "Replan" | "Yourmerchandising";

export const recentPosts = [
  { id: "p1", brand: "Upsystems", title: "Zucchetti Datacenter: 5 vantaggi", date: "2025-08-31", impressions: 2450, clicks: 132 },
  { id: "p2", brand: "Teamtalent", title: "WMS per magazzini efficienti", date: "2025-09-01", impressions: 1880, clicks: 98 },
  { id: "p3", brand: "Replan", title: "Industry 5.0: casi pratici", date: "2025-09-02", impressions: 990, clicks: 44 },
  { id: "p4", brand: "Yourmerchandising", title: "Corporate merchandising 2025", date: "2025-09-03", impressions: 1210, clicks: 51 },
] as const;

export const recentDEM = [
  { id: "m1", brand: "Upsystems", subject: "Voucher Transizione Digitale 2025", sentAt: "2025-09-01 10:30", audience: 1850, openRate: 0.41, ctr: 0.07 },
  { id: "m2", brand: "Teamtalent", subject: "DMS: riduci i tempi del 40%", sentAt: "2025-08-29 09:00", audience: 1220, openRate: 0.38, ctr: 0.06 },
] as const;

export const followersByMonth = [
  { month: "2025-04", Upsystems: 1240, Teamtalent: 680, Replan: 210, Yourmerchandising: 340 },
  { month: "2025-05", Upsystems: 1320, Teamtalent: 702, Replan: 230, Yourmerchandising: 360 },
  { month: "2025-06", Upsystems: 1410, Teamtalent: 750, Replan: 255, Yourmerchandising: 390 },
  { month: "2025-07", Upsystems: 1495, Teamtalent: 790, Replan: 280, Yourmerchandising: 415 },
  { month: "2025-08", Upsystems: 1588, Teamtalent: 833, Replan: 305, Yourmerchandising: 451 },
  { month: "2025-09", Upsystems: 1650, Teamtalent: 860, Replan: 322, Yourmerchandising: 468 },
];

export const calendarItems = [
  { type: "post", brand: "Upsystems", date: "2025-09-01", title: "Post LinkedIn: Voucher Digitale" },
  { type: "post", brand: "Teamtalent", date: "2025-09-02", title: "Post Blog: WMS 2025" },
  { type: "dem", brand: "Upsystems", date: "2025-09-03", title: "DEM: Bando Transizione" },
  { type: "post", brand: "Yourmerchandising", date: "2025-09-07", title: "IG Post: Back to Work" },
  { type: "dem", brand: "Teamtalent", date: "2025-09-10", title: "Newsletter: DMS" },
  { type: "post", brand: "Replan", date: "2025-09-12", title: "LinkedIn: Industria 5.0" },
];

export function monthLabel(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(y, m - 1);
  return d.toLocaleDateString("it-IT", { month: "long", year: "numeric" });
}
