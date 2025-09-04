'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useData, type CalendarItem, slugToBrand } from '@/components/DataContext';
import EventModal from './EventModal';

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

// util
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function fmtMonthYear(d: Date) {
  return d.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
}
function dateISO(d: Date) {
  return d.toISOString().slice(0, 10);
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

type DayCell = {
  date: Date;
  inMonth: boolean;
};

export default function MonthCalendar() {
  const pathname = usePathname();
  const env = pathname.split('/').filter(Boolean)[0] as keyof typeof slugToBrand | undefined;
  const brand = env ? slugToBrand[env] : undefined;

  const { data } = useData();
  const allItems = data.calendar;

  const [cursor, setCursor] = useState<Date>(startOfMonth(new Date()));
  const [editItem, setEditItem] = useState<CalendarItem | null>(null);
  const [createForDate, setCreateForDate] = useState<Date | null>(null);

  // filtra eventi per brand e mese in vista
  const items = useMemo(() => {
    const first = startOfMonth(cursor);
    const last = endOfMonth(cursor);
    const firstISO = dateISO(first);
    const lastISO = dateISO(last);
    return allItems.filter((c) => {
      if (brand && c.brand !== brand) return false;
      return c.date >= firstISO && c.date <= lastISO;
    });
  }, [allItems, cursor, brand]);

  // genera le celle (riempie i giorni della settimana prima/dopo per completare la griglia)
  const cells = useMemo<DayCell[]>(() => {
    const first = startOfMonth(cursor);
    const last = endOfMonth(cursor);

    // in Italia settimana inizia il lunedì -> getDay(): 0=dom 1=lun ...
    const firstWeekday = (first.getDay() + 6) % 7; // lun=0 ... dom=6
    const daysInMonth = last.getDate();

    const prevDays: DayCell[] = Array.from({ length: firstWeekday }).map((_, i) => {
      const d = new Date(first);
      d.setDate(d.getDate() - (firstWeekday - i));
      return { date: d, inMonth: false };
    });

    const monthDays: DayCell[] = Array.from({ length: daysInMonth }).map((_, i) => {
      const d = new Date(first);
      d.setDate(i + 1);
      return { date: d, inMonth: true };
    });

    const total = prevDays.length + monthDays.length;
    const rows = Math.ceil(total / 7);
    const nextFill = rows * 7 - total;

    const nextDays: DayCell[] = Array.from({ length: nextFill }).map((_, i) => {
      const d = new Date(last);
      d.setDate(last.getDate() + i + 1);
      return { date: d, inMonth: false };
    });

    return [...prevDays, ...monthDays, ...nextDays];
  }, [cursor]);

  function eventsOf(d: Date) {
    const iso = dateISO(d);
    return items.filter((c) => c.date === iso);
  }

  return (
    <section className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Calendario editoriale</h1>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border px-3 py-2 hover:bg-black/5"
            onClick={() => setCursor(addMonths(cursor, -1))}
            title="Mese precedente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="min-w-[200px] select-none rounded-lg border bg-white/70 px-3 py-2 text-center font-medium capitalize">
            {fmtMonthYear(cursor)}
          </div>
          <button
            className="rounded-lg border px-3 py-2 hover:bg-black/5"
            onClick={() => setCursor(addMonths(cursor, +1))}
            title="Mese successivo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            className="ml-2 hidden rounded-lg border bg-white/70 px-3 py-2 text-sm hover:bg-black/5 md:block"
            onClick={() => setCursor(startOfMonth(new Date()))}
          >
            Oggi
          </button>
        </div>
      </div>

      {/* Intestazione giorni */}
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((w) => (
          <div key={w} className="px-2 py-1 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
            {w}
          </div>
        ))}
      </div>

      {/* Griglia giorni */}
      <div className="grid grid-cols-7 gap-2">
        {cells.map(({ date, inMonth }) => {
          const today = isSameDay(date, new Date());
          const dayEvents = eventsOf(date);
          return (
            <div
              key={date.toISOString()}
              className={[
                'min-h-[110px] rounded-xl border bg-white/70 p-2',
                inMonth ? 'opacity-100' : 'opacity-60',
                today ? 'ring-1 ring-purple-400' : '',
              ].join(' ')}
            >
              {/* header cella */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{date.getDate()}</span>
                {inMonth && (
                  <button
                    className="rounded-md p-1 hover:bg-black/5"
                    title="Aggiungi attività"
                    onClick={() => setCreateForDate(date)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* eventi */}
              <div className="space-y-1">
                {dayEvents.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setEditItem(ev)}
                    className={[
                      'group flex w-full items-center gap-2 truncate rounded-md border px-2 py-1 text-left text-xs hover:bg-white',
                      ev.type === 'dem'
                        ? 'border-orange-200 bg-orange-50 text-orange-700'
                        : ev.type === 'post'
                        ? 'border-sky-200 bg-sky-50 text-sky-700'
                        : 'border-gray-200 bg-gray-50 text-gray-700',
                    ].join(' ')}
                    title={ev.title}
                  >
                    <CalIcon className="h-3.5 w-3.5 opacity-70" />
                    <span className="truncate">{ev.title}</span>
                  </button>
                ))}
                {dayEvents.length === 0 && (
                  <div className="text-center text-[11px] text-gray-400">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modali */}
      {editItem && (
        <EventModal
          initial={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
      {createForDate && (
        <EventModal
          initial={{
            id: '',
            type: 'post',
            brand: brand ?? 'Upsystems',
            date: dateISO(createForDate),
            title: '',
          }}
          onClose={() => setCreateForDate(null)}
        />
      )}
    </section>
  );
}
