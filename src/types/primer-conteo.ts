export interface AreaConteo {
  area: 'A1' | 'A2' | 'A3' | 'A4';
  adultos: number;
  ninos: number;
}

export interface PrimerConteoData {
  id?: string;
  fecha: string; // ISO date YYYY-MM-DD
  servicio: string; // ej: "VIERNES"
  hora: string; // ej: "07:00 PM"
  areas: AreaConteo[];
  createdAt?: string;
}

export const AREAS: AreaConteo['area'][] = ['A1', 'A2', 'A3', 'A4'];

export const SERVICIOS = [
  { value: 'VIERNES', label: 'Viernes' },
  { value: 'SABADO', label: 'Sábado' },
  { value: 'DOMINGO', label: 'Domingo' },
] as const;

export const HORAS_SERVICIO = [
  '07:00 PM',
  '08:00 AM',
  '09:00 AM',
  '11:00 AM',
  '05:30 PM',
  '06:00 PM',
] as const;

/** Deriva el servicio (Viernes/Sábado/Domingo) del día de la semana de la fecha */
export function getServicioFromDate(date: Date): 'VIERNES' | 'SABADO' | 'DOMINGO' {
  const day = date.getDay(); // 0 = Domingo, 5 = Viernes, 6 = Sábado
  if (day === 0) return 'DOMINGO';
  if (day === 5) return 'VIERNES';
  if (day === 6) return 'SABADO';
  return 'VIERNES'; // fallback para otros días
}
