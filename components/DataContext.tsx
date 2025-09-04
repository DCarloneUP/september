'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  recentPosts,
  recentDEM,
  followersByMonth,
  calendarItems,
} from '@/lib/mock';

export type BrandName =
  | 'Upsystems'
  | 'Teamtalent'
  | 'Replan'
  | 'Yourmerchandising';
export type EnvSlug =
  | 'upsystems'
  | 'teamtalent'
  | 'replan'
  | 'yourmerchandising';

export const slugToBrand: Record<EnvSlug, BrandName> = {
  upsystems: 'Upsystems',
  teamtalent: 'Teamtalent',
  replan: 'Replan',
  yourmerchandising: 'Yourmerchandising',
};

export type Post = {
  id: string;
  brand: BrandName;
  title: string;
  date: string; // ISO
  impressions: number;
  clicks: number;
};

export type Dem = {
  id: string;
  brand: BrandName;
  subject: string;
  sentAt: string; // "YYYY-MM-DD HH:mm"
  audience: number;
  openRate: number; // 0..1
  ctr: number; // 0..1
};

export type CalendarItem = {
  // prima era: type: 'post' | 'dem' | 'other';
  type: string;            // <-- allargo il tipo per accettare qualsiasi string
  brand: BrandName;
  date: string;            // YYYY-MM-DD
  title: string;
};

export type FollowersRow = {
  month: string; // YYYY-MM
} & Record<BrandName, number>;

export type DataSet = {
  posts: Post[];
  dem: Dem[];
  calendar: CalendarItem[];
  followers: FollowersRow[];
};

const DEFAULT_DATA: DataSet = {
  posts: toPosts(recentPosts as any),
  dem: toDem(recentDEM as any),
  calendar: toCalendar(calendarItems as any),      // <-- normalizza brand e type
  followers: toFollowers(followersByMonth as any),
};


const STORAGE_KEY = 'september-data-v1';

type Ctx = {
  data: DataSet;
  setData: React.Dispatch<React.SetStateAction<DataSet>>;
  importFile: (file: File) => Promise<void>;
  exportJson: () => void;
};

const DataContext = createContext<Ctx | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataSet>(DEFAULT_DATA);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  async function importFile(file: File) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (ext === 'json') {
      const text = await file.text();
      const parsed = JSON.parse(text);
      setData(normalizeIncoming(parsed, data));
      return;
    }
    if (ext === 'csv') {
      const text = await file.text();
      const { data: rows } = Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });
      setData(importFromRows(rows as any[], data));
      return;
    }
    if (ext === 'xlsx' || ext === 'xls') {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf);
      let next = { ...data };

      const sheets = ['posts', 'dem', 'calendar', 'followers'];
      for (const s of sheets) {
        const ws = wb.Sheets[s];
        if (!ws) continue;
        const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
        next = importFromNamedRows(s, rows as any[], next);
      }
      setData(next);
      return;
    }
    throw new Error('Formato non supportato: usa JSON, CSV o XLSX');
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'september-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DataContext.Provider value={{ data, setData, importFile, exportJson }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

/* ---------- Helpers ---------- */

function normalizeIncoming(incoming: Partial<DataSet>, prev: DataSet): DataSet {
  const next: DataSet = {
    posts: mergeById(prev.posts, toPosts(incoming.posts ?? [])),
    dem: mergeById(prev.dem, toDem(incoming.dem ?? [])),
    calendar: mergeById(prev.calendar, toCalendar(incoming.calendar ?? [])),
    followers: toFollowers(incoming.followers ?? prev.followers),
  };
  return next;
}

function toPosts(rows: any[]): Post[] {
  return rows
    .filter(Boolean)
    .map((r) => ({
      id: String(r.id ?? cryptoRandom()),
      brand: fixBrand(r.brand),
      title: String(r.title ?? ''),
      date: String(r.date ?? ''),
      impressions: toNum(r.impressions),
      clicks: toNum(r.clicks),
    }))
    .filter((p) => !!p.title && !!p.date);
}

function toDem(rows: any[]): Dem[] {
  return rows
    .filter(Boolean)
    .map((r) => ({
      id: String(r.id ?? cryptoRandom()),
      brand: fixBrand(r.brand),
      subject: String(r.subject ?? ''),
      sentAt: String(r.sentAt ?? r.date ?? ''),
      audience: toNum(r.audience),
      openRate: toRate(r.openRate),
      ctr: toRate(r.ctr),
    }))
    .filter((m) => !!m.subject && !!m.sentAt);
}

function toCalendar(rows: any[]): CalendarItem[] {
  return rows
    .filter(Boolean)
    .map((r) => ({
      type: (String(r.type || 'post').toLowerCase() as CalendarItem['type']) ??
        'post',
      brand: fixBrand(r.brand),
      date: String(r.date ?? ''),
      title: String(r.title ?? ''),
    }))
    .filter((c) => !!c.title && !!c.date);
}

function toFollowers(rows: any[]): FollowersRow[] {
  const brands: BrandName[] = [
    'Upsystems',
    'Teamtalent',
    'Replan',
    'Yourmerchandising',
  ];
  return rows
    .filter(Boolean)
    .map((r) => {
      const row: FollowersRow = {
        month: String(r.month ?? r.Month ?? ''),
        Upsystems: toNum(r.Upsystems ?? r.upsystems),
        Teamtalent: toNum(r.Teamtalent ?? r.teamtalent),
        Replan: toNum(r.Replan ?? r.replan),
        Yourmerchandising: toNum(r.Yourmerchandising ?? r.yourmerchandising),
      } as any;
      brands.forEach((b) => {
        if (typeof (row as any)[b] !== 'number') (row as any)[b] = 0;
      });
      return row;
    })
    .filter((r) => !!r.month);
}

function importFromRows(rows: any[], prev: DataSet): DataSet {
  if (!rows?.length) return prev;

  const headers = Object.keys(rows[0]).map((h) => h.toLowerCase());
  const looksFollowers = headers.includes('month');
  const looksDem = headers.includes('sentat') || headers.includes('subject');
  const looksCalendar =
    headers.includes('type') && headers.includes('date') && headers.includes('title');

  if (looksFollowers) {
    return { ...prev, followers: toFollowers(rows) };
  }
  if (looksDem) {
    return { ...prev, dem: mergeById(prev.dem, toDem(rows)) };
  }
  if (looksCalendar) {
    return { ...prev, calendar: mergeById(prev.calendar, toCalendar(rows)) };
  }
  // default: consideralo come POST
  return { ...prev, posts: mergeById(prev.posts, toPosts(rows)) };
}

function importFromNamedRows(
  sheet: string,
  rows: any[],
  prev: DataSet
): DataSet {
  switch (sheet.toLowerCase()) {
    case 'posts':
      return { ...prev, posts: mergeById(prev.posts, toPosts(rows)) };
    case 'dem':
      return { ...prev, dem: mergeById(prev.dem, toDem(rows)) };
    case 'calendar':
      return { ...prev, calendar: mergeById(prev.calendar, toCalendar(rows)) };
    case 'followers':
      return { ...prev, followers: toFollowers(rows) };
    default:
      return prev;
  }
}

function mergeById<T extends { id: string }>(prev: T[], next: T[]): T[] {
  const map = new Map(prev.map((p) => [p.id, p]));
  next.forEach((n) => map.set(n.id, n));
  return Array.from(map.values());
}

function toNum(v: any): number {
  const s = String(v ?? '').replace(',', '.').replace(/\s/g, '');
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function toRate(v: any): number {
  if (typeof v === 'number') return v > 1 ? v / 100 : v;
  const s = String(v ?? '').trim();
  if (!s) return 0;
  if (s.endsWith('%')) return toNum(s.slice(0, -1)) / 100;
  return toNum(s) > 1 ? toNum(s) / 100 : toNum(s);
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2);
}

function fixBrand(b: any): BrandName {
  const s = String(b ?? '').toLowerCase();
  if (s.includes('merch')) return 'Yourmerchandising';
  if (s.includes('team')) return 'Teamtalent';
  if (s.includes('replan')) return 'Replan';
  return 'Upsystems';
}
