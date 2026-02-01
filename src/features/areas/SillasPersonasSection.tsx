import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import type { SillasPersonasState } from './useSillasPersonas';

interface SillasPersonasSectionProps {
  data: SillasPersonasState;
  onUpdate: <K extends keyof SillasPersonasState>(
    key: K,
    value: SillasPersonasState[K]
  ) => void;
  ninosLabel: string;
}

export function SillasPersonasSection({
  data,
  onUpdate,
  ninosLabel,
}: SillasPersonasSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Card>
        <CardHeader className="px-3 pb-2 pt-3">
          <CardTitle className="text-sm">Sillas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-3 pb-3">
          <NumberInput
            label="Total sillas"
            value={data.totalSillas}
            onChange={(v) => onUpdate('totalSillas', v)}
          />
          <NumberInput
            label="Vacías"
            value={data.sillasVacias}
            onChange={(v) => onUpdate('sillasVacias', v)}
            max={data.totalSillas}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="px-3 pb-2 pt-3">
          <CardTitle className="text-sm">Personas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-3 pb-3">
          <NumberInput
            label="Total personas"
            value={data.totalPersonas}
            onChange={(v) => onUpdate('totalPersonas', v)}
          />
          <NumberInput
            label={ninosLabel}
            value={data.totalNinos}
            onChange={(v) => onUpdate('totalNinos', v)}
            max={data.totalPersonas}
          />
        </CardContent>
      </Card>
    </div>
  );
}
