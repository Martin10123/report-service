import { useState } from 'react';
import { AreaPageLayout } from '@/features/areas';
import {
  TableSection,
  TableHeaderRow,
  TableHeaderCell,
  TableCell,
} from '@/features/reportes';
import { NumberInput } from '@/components/ui/number-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClaseRow {
  invInicial: number;
  ingresados: number;
  entregados: number;
}

const INITIAL_OFRENDA: ClaseRow = { invInicial: 915, ingresados: 400, entregados: 183 };
const INITIAL_PROTEMPLO: ClaseRow = { invInicial: 0, ingresados: 0, entregados: 0 };
const INITIAL_IGLEKIDS: ClaseRow = { invInicial: 39, ingresados: 0, entregados: 0 };

function InventarioTable() {
  const [ofrenda, setOfrenda] = useState(INITIAL_OFRENDA);
  const [protemplo, setProtemplo] = useState(INITIAL_PROTEMPLO);
  const [iglekids, setIglekids] = useState(INITIAL_IGLEKIDS);

  const tot = (r: ClaseRow) => r.invInicial + r.ingresados;
  const final = (r: ClaseRow) => tot(r) - r.entregados;

  const updateOfrenda = (k: keyof ClaseRow, v: number) =>
    setOfrenda((p) => ({ ...p, [k]: v }));
  const updateProtemplo = (k: keyof ClaseRow, v: number) =>
    setProtemplo((p) => ({ ...p, [k]: v }));
  const updateIglekids = (k: keyof ClaseRow, v: number) =>
    setIglekids((p) => ({ ...p, [k]: v }));

  const rows: { clase: string; data: ClaseRow; update: (k: keyof ClaseRow, v: number) => void }[] = [
    { clase: 'Ofrenda', data: ofrenda, update: updateOfrenda },
    { clase: 'Protemplo', data: protemplo, update: updateProtemplo },
    { clase: 'Iglekids', data: iglekids, update: updateIglekids },
  ];

  return (
    <>
      {/* Desktop: tabla completa */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-lg border-collapse rounded-md border border-border text-left">
          <thead>
            <TableHeaderRow>
              <TableHeaderCell>Clase</TableHeaderCell>
              <TableHeaderCell>Inv.inicial</TableHeaderCell>
              <TableHeaderCell>Ingresados</TableHeaderCell>
              <TableHeaderCell>Tot.Inicial</TableHeaderCell>
              <TableHeaderCell>Entregados</TableHeaderCell>
              <TableHeaderCell>Inv.Final</TableHeaderCell>
            </TableHeaderRow>
          </thead>
          <tbody className="bg-card">
            {rows.map(({ clase, data, update }) => (
              <tr key={clase} className="border-b border-border">
                <TableCell className="font-medium">{clase}</TableCell>
                <TableCell>
                  <NumberInput compact label="" value={data.invInicial} onChange={(v) => update('invInicial', v)} />
                </TableCell>
                <TableCell>
                  <NumberInput compact label="" value={data.ingresados} onChange={(v) => update('ingresados', v)} />
                </TableCell>
                <TableCell className="font-semibold">{tot(data)}</TableCell>
                <TableCell>
                  <NumberInput compact label="" value={data.entregados} onChange={(v) => update('entregados', v)} />
                </TableCell>
                <TableCell className="font-semibold">{final(data)}</TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile: una card por clase, filas con NumberInput (+/-) y etiquetas completas */}
      <div className="grid gap-4 md:hidden">
        {rows.map(({ clase, data, update }) => (
          <Card key={clase} className="overflow-hidden">
            <CardHeader className="bg-primary/10 px-3 py-3">
              <CardTitle className="text-sm font-semibold">{clase}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-3 py-3">
              <NumberInput
                label="Inventario inicial"
                value={data.invInicial}
                onChange={(v) => update('invInicial', v)}
              />
              <NumberInput
                label="Ingresados"
                value={data.ingresados}
                onChange={(v) => update('ingresados', v)}
              />
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground">Total inicial</span>
                <span className="text-sm font-semibold text-foreground">{tot(data)}</span>
              </div>
              <NumberInput
                label="Entregados"
                value={data.entregados}
                onChange={(v) => update('entregados', v)}
              />
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground">Inventario final</span>
                <span className="text-sm font-semibold text-foreground">{final(data)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export function SobresPage() {
  const [date] = useState(() => new Date());
  const [canastas, setCanastas] = useState(7);

  return (
    <AreaPageLayout title="Sobres" date={date}>
      <div className="space-y-4">
        <TableSection title="Inventario de Sobres">
          <InventarioTable />
        </TableSection>
        <Card>
          <CardHeader className="px-4 pb-2 pt-4">
            <CardTitle className="text-sm">Canastas</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center gap-4 rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-sm font-medium text-foreground">Canastas:</span>
              <NumberInput label="Cantidad" value={canastas} onChange={setCanastas} max={999} />
            </div>
          </CardContent>
        </Card>
      </div>
    </AreaPageLayout>
  );
}
