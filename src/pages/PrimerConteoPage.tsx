import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/constants';
import {
  AREAS,
  type AreaConteo,
} from '@/types/primer-conteo';

export function PrimerConteoPage() {
  const [areas, setAreas] = useState<AreaConteo[]>(() =>
    AREAS.map((a) => ({ area: a, adultos: 0, ninos: 0 }))
  );
  const totalAdultos = areas.reduce((s, a) => s + a.adultos, 0);
  const totalNinos = areas.reduce((s, a) => s + a.ninos, 0);
  const totalAsistencia = totalAdultos + totalNinos;

  const handleAreaChange = (idx: number, field: 'adultos' | 'ninos', value: number) => {
    setAreas((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: Math.max(0, value) };
      return next;
    });
  };

  return (
    <div className="space-y-2 sm:space-y-3 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl! m-0! font-bold tracking-tight text-gray-900 sm:text-2xl!">
          Primer Conteo
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500"> Fecha y hora: 10/10/2026 10:00</p>
          <Button variant="ghost" size="icon">
            <RefreshCcw className="size-4" />
          </Button>
        </div>
      </div>

      {/* Bloques por área */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {areas.map((a, idx) => (
          <Card
            key={a.area}
            className="border-sky-100 bg-sky-50/50"
          >
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-medium text-sky-800 sm:text-sm">
                Área: {a.area}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3 pt-0">
              <div className="space-y-1">
                <Label htmlFor={`adultos-${a.area}`} className="text-xs">Adultos</Label>
                <Input
                  id={`adultos-${a.area}`}
                  type="number"
                  min={0}
                  value={a.adultos || ''}
                  onChange={(e) =>
                    handleAreaChange(idx, 'adultos', parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="0"
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`ninos-${a.area}`} className="text-xs">Niños</Label>
                <Input
                  id={`ninos-${a.area}`}
                  type="number"
                  min={0}
                  value={a.ninos || ''}
                  onChange={(e) =>
                    handleAreaChange(idx, 'ninos', parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="0"
                  className="h-8 text-sm"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumen y Total final - grid-cols-2 */}
      <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2">
        {/* Resumen Primer Conteo */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-sm text-foreground sm:text-base">Resumen primer conteo</CardTitle>
            <p className="wrap-break-word text-xs text-muted-foreground sm:text-sm">
              {10} · {10} · {10}
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 p-3 pt-2">
            <div className="flex flex-col rounded-lg bg-white/60 px-3 py-2">
              <span className="text-xs text-muted-foreground sm:text-sm">Total Adultos</span>
              <span className="text-lg font-bold text-foreground sm:text-xl">{totalAdultos}</span>
            </div>
            <div className="flex flex-col rounded-lg bg-white/60 px-3 py-2">
              <span className="text-xs text-muted-foreground sm:text-sm">Total Niños</span>
              <span className="text-lg font-bold text-foreground sm:text-xl">{totalNinos}</span>
            </div>
            <div className="col-span-2 flex flex-col rounded-lg bg-white/60 px-3 py-2">
              <span className="text-xs text-muted-foreground sm:text-sm">Total Asistencia</span>
              <span className="text-lg font-bold text-foreground sm:text-xl">{totalAsistencia}</span>
            </div>
          </CardContent>
        </Card>

        {/* Total final (por ahora = primer conteo) */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-sm text-foreground sm:text-base">Total final asistencia</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 p-3 pt-2">
            <div className="flex flex-col rounded-lg bg-white/60 px-3 py-2">
              <span className="text-xs text-muted-foreground sm:text-sm">Total Adultos</span>
              <span className="text-lg font-bold text-foreground sm:text-xl">{totalAdultos}</span>
            </div>
            <div className="flex flex-col rounded-lg bg-white/60 px-3 py-2">
              <span className="text-xs text-muted-foreground sm:text-sm">Total Niños</span>
              <span className="text-lg font-bold text-foreground sm:text-xl">{totalNinos}</span>
            </div>
            <div className="col-span-2 flex flex-col rounded-lg bg-white/60 px-3 py-2">
              <span className="text-xs text-muted-foreground sm:text-sm">Total Asistencia</span>
              <span className="text-lg font-bold text-foreground sm:text-xl">{totalAsistencia}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guardar */}
      <div className="flex justify-end pt-1">
        <Button size="sm" className="w-full px-6 sm:w-auto">
          Guardar
        </Button>
      </div>
    </div>
  );
}
