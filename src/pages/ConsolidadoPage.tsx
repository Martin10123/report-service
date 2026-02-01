import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AreaPageLayout } from '@/features/areas';
import {
  TableSection,
  TableHeaderRow,
  TableHeaderCell,
  TableCell,
} from '@/features/reportes';

const AUDITORIO_ROWS = [
  { label: 'Sillas del área.', a1: 270, a2: 230, a3: 496, a4: '-', totales: 996 },
  { label: 'Silla vacías', a1: 0, a2: 6, a3: 0, a4: '-', totales: 6 },
  { label: 'Total Personas', a1: 257, a2: 213, a3: 470, a4: '-', totales: 940 },
  { label: 'Total niños', a1: 5, a2: 4, a3: 16, a4: '-', totales: 25 },
  { label: 'Total AUDITORIO', a1: 532, a2: 453, a3: 982, a4: '-', totales: '-' },
];

const SERVIDORES_ROWS = [
  { label: 'Servidores:', a1: 8, a2: 6, a3: 10, a4: 4, total: 28 },
  { label: 'Consolidación:', a1: '-', a2: '-', a3: 0, a4: '-', total: 0 },
  { label: 'Comunicaciones:', a1: 8, a2: '-', a3: '-', a4: '-', total: 8 },
  { label: 'Logistica:', a1: 4, a2: 1, a3: 1, a4: 4, total: 10 },
  { label: 'Jesus place:', a1: '-', a2: 2, a3: '-', a4: '-', total: 2 },
  { label: 'Datafono:', a1: '-', a2: 4, a3: '-', a4: '-', total: 4 },
  { label: 'Coffee:', a1: '-', a2: '-', a3: '-', a4: 2, total: 2 },
  { label: 'Ministerial:', a1: '-', a2: 0, a3: '-', a4: '-', total: 0 },
  { label: 'Alabanza:', a1: 10, a2: '-', a3: '-', a4: '-', total: 10 },
  { label: 'VIP:', a1: 1, a2: '-', a3: '-', a4: '-', total: 1 },
  { label: 'Iglekids:', a1: '-', a2: '-', a3: '-', a4: 0, total: 0 },
  { label: 'Total Servidores', a1: 31, a2: 13, a3: 11, a4: 10, total: 65 },
];

function AuditorioTable() {
  return (
    <table className="w-full min-w-md border-collapse rounded-md border border-border text-left">
      <thead>
        <TableHeaderRow>
          <TableHeaderCell>RESUMEN GENERAL</TableHeaderCell>
          <TableHeaderCell>A1</TableHeaderCell>
          <TableHeaderCell>A2</TableHeaderCell>
          <TableHeaderCell>A3</TableHeaderCell>
          <TableHeaderCell>A4</TableHeaderCell>
          <TableHeaderCell>TOTALES</TableHeaderCell>
        </TableHeaderRow>
      </thead>
      <tbody className="bg-card">
        {AUDITORIO_ROWS.map((row) => (
          <tr key={row.label} className="border-b border-border">
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell>{row.a1}</TableCell>
            <TableCell>{row.a2}</TableCell>
            <TableCell>{row.a3}</TableCell>
            <TableCell>{row.a4}</TableCell>
            <TableCell className="font-semibold">{row.totales}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ServidoresTable() {
  return (
    <table className="w-full min-w-md border-collapse rounded-md border border-border text-left">
      <thead>
        <TableHeaderRow>
          <TableHeaderCell>Areas</TableHeaderCell>
          <TableHeaderCell>A1</TableHeaderCell>
          <TableHeaderCell>A2</TableHeaderCell>
          <TableHeaderCell>A3</TableHeaderCell>
          <TableHeaderCell>A4</TableHeaderCell>
          <TableHeaderCell>TOTAL</TableHeaderCell>
        </TableHeaderRow>
      </thead>
      <tbody className="bg-card">
        {SERVIDORES_ROWS.map((row) => (
          <tr key={row.label} className="border-b border-border">
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell>{row.a1}</TableCell>
            <TableCell>{row.a2}</TableCell>
            <TableCell>{row.a3}</TableCell>
            <TableCell>{row.a4}</TableCell>
            <TableCell className="font-semibold">{row.total}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ConsolidadoPage() {
  const [date] = useState(() => new Date());

  return (
    <AreaPageLayout title="Consolidado" date={date}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          FECHA: <span className="font-medium text-foreground">{format(date, "d/MMM/y", { locale: es })}</span>
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TableSection title="AUDITORIO" subtitle="RESUMEN GENERAL">
            <AuditorioTable />
          </TableSection>
          <TableSection title="SERVIDORES" subtitle="Areas">
            <ServidoresTable />
          </TableSection>
        </div>
        <TableSection title="PARQUEADERO" subtitle="VEHÍCULOS">
          <table className="w-full min-w-[16rem] border-collapse rounded-md border border-border text-left">
            <tbody className="bg-card">
              <tr className="border-b border-border">
                <TableCell className="font-medium">Carros</TableCell>
                <TableCell>150</TableCell>
              </tr>
              <tr className="border-b border-border">
                <TableCell className="font-medium">Motos</TableCell>
                <TableCell>101</TableCell>
              </tr>
              <tr className="border-b border-border">
                <TableCell className="font-medium">Bicicletas</TableCell>
                <TableCell>4</TableCell>
              </tr>
              <tr>
                <TableCell className="font-semibold">Total Vehículos</TableCell>
                <TableCell className="font-semibold">255</TableCell>
              </tr>
            </tbody>
          </table>
        </TableSection>
      </div>
    </AreaPageLayout>
  );
}
