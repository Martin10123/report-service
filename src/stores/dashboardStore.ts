import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ServicioResumen {
  id: string;
  fecha: string;
  servicio: string;
  hora: string;
  totalAsistencia: number;
  adultos: number;
  ninos: number;
  totalServidores: number;
}

export interface ReporteDelDia {
  primerConteoCompleto: boolean;
  totalAsistencia: number;
  adultos: number;
  ninos: number;
  porArea: { area: string; asistencia: number; servidores: number }[];
  totalServidores: number;
  sobresEntregados: number;
  seccionesCompletas: {
    primerConteo: boolean;
    a1: boolean;
    a2: boolean;
    a3: boolean;
    a4: boolean;
    sobres: boolean;
  };
}

// Datos mock para el reporte del día (cuando haya backend, se reemplaza)
const MOCK_REPORTE_DIA: ReporteDelDia = {
  primerConteoCompleto: true,
  totalAsistencia: 342,
  adultos: 298,
  ninos: 44,
  porArea: [
    { area: 'A1', asistencia: 120, servidores: 18 },
    { area: 'A2', asistencia: 95, servidores: 12 },
    { area: 'A3', asistencia: 78, servidores: 10 },
    { area: 'A4', asistencia: 49, servidores: 8 },
  ],
  totalServidores: 48,
  sobresEntregados: 183,
  seccionesCompletas: {
    primerConteo: true,
    a1: true,
    a2: true,
    a3: true,
    a4: false,
    sobres: true,
  },
};

// Últimos servicios para gráfico y tabla (mock)
const MOCK_ULTIMOS_SERVICIOS: ServicioResumen[] = [
  { id: '1', fecha: '2025-01-26', servicio: 'Domingo', hora: '11:00 AM', totalAsistencia: 342, adultos: 298, ninos: 44, totalServidores: 48 },
  { id: '2', fecha: '2025-01-25', servicio: 'Sábado', hora: '07:00 PM', totalAsistencia: 215, adultos: 190, ninos: 25, totalServidores: 32 },
  { id: '3', fecha: '2025-01-24', servicio: 'Viernes', hora: '07:00 PM', totalAsistencia: 280, adultos: 245, ninos: 35, totalServidores: 40 },
  { id: '4', fecha: '2025-01-19', servicio: 'Domingo', hora: '11:00 AM', totalAsistencia: 398, adultos: 350, ninos: 48, totalServidores: 52 },
  { id: '5', fecha: '2025-01-18', servicio: 'Sábado', hora: '07:00 PM', totalAsistencia: 192, adultos: 168, ninos: 24, totalServidores: 28 },
  { id: '6', fecha: '2025-01-17', servicio: 'Viernes', hora: '07:00 PM', totalAsistencia: 265, adultos: 230, ninos: 35, totalServidores: 38 },
  { id: '7', fecha: '2025-01-12', servicio: 'Domingo', hora: '11:00 AM', totalAsistencia: 410, adultos: 362, ninos: 48, totalServidores: 55 },
];

interface DashboardState {
  reporteDelDia: ReporteDelDia;
  ultimosServicios: ServicioResumen[];
  fechaServicio: string; // YYYY-MM-DD del servicio que se está reportando
}

interface DashboardActions {
  setReporteDelDia: (reporte: Partial<ReporteDelDia>) => void;
  setUltimosServicios: (servicios: ServicioResumen[]) => void;
  setFechaServicio: (fecha: string) => void;
}

export const useDashboardStore = create<DashboardState & DashboardActions>()(
  persist(
    (set) => ({
      reporteDelDia: MOCK_REPORTE_DIA,
      ultimosServicios: MOCK_ULTIMOS_SERVICIOS,
      fechaServicio: new Date().toISOString().slice(0, 10),

      setReporteDelDia: (reporte) =>
        set((state) => ({
          reporteDelDia: { ...state.reporteDelDia, ...reporte },
        })),

      setUltimosServicios: (servicios) => set({ ultimosServicios: servicios }),

      setFechaServicio: (fecha) => set({ fechaServicio: fecha }),
    }),
    { name: 'dashboard-storage' }
  )
);
