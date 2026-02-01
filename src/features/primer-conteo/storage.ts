import type { PrimerConteoData } from '@/types/primer-conteo';

const STORAGE_KEY_PREFIX = 'primer-conteo';
const INDEX_KEY = 'primer-conteo-index';

function getStorageKey(fecha: string, servicio: string, hora: string): string {
  return `${STORAGE_KEY_PREFIX}-${fecha}-${servicio}-${hora.replace(/:/g, '-')}`;
}

function getIndex(): string[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addToIndex(key: string): void {
  const index = getIndex();
  if (!index.includes(key)) {
    index.push(key);
    index.sort().reverse(); // más recientes primero
    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
  }
}

export function savePrimerConteo(data: PrimerConteoData): void {
  const key = getStorageKey(data.fecha, data.servicio, data.hora);
  const toSave = {
    ...data,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(toSave));
  addToIndex(key);
}

export function loadPrimerConteo(
  fecha: string,
  servicio: string,
  hora: string
): PrimerConteoData | null {
  const key = getStorageKey(fecha, servicio, hora);
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getConteosByDate(fecha: string): PrimerConteoData[] {
  const index = getIndex();
  const prefix = `${STORAGE_KEY_PREFIX}-${fecha}`;
  const keys = index.filter((k) => k.startsWith(prefix));
  const results: PrimerConteoData[] = [];
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) results.push(JSON.parse(raw));
    } catch {
      /* skip invalid */
    }
  }
  return results;
}

export function getAvailableDates(): string[] {
  const index = getIndex();
  const dates = new Set<string>();
  for (const key of index) {
    const match = key.match(/^primer-conteo-(\d{4}-\d{2}-\d{2})-/);
    if (match) dates.add(match[1]);
  }
  return Array.from(dates).sort().reverse();
}
