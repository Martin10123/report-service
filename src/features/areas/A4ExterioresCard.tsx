import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';

interface A4ExterioresCardProps {
  servidores: number;
  logistica: number;
  coffe: number;
  container: number;
  onServidoresChange: (v: number) => void;
  onLogisticaChange: (v: number) => void;
  onCoffeChange: (v: number) => void;
  onContainerChange: (v: number) => void;
}

export function A4ExterioresCard({
  servidores,
  logistica,
  coffe,
  container,
  onServidoresChange,
  onLogisticaChange,
  onCoffeChange,
  onContainerChange,
}: A4ExterioresCardProps) {
  return (
    <Card>
      <CardHeader className="px-3 pb-2 pt-3">
        <CardTitle className="text-sm">EXTERIORES</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <NumberInput label="Servidores" value={servidores} onChange={onServidoresChange} />
          <NumberInput label="Logística" value={logistica} onChange={onLogisticaChange} />
          <NumberInput label="Coffe." value={coffe} onChange={onCoffeChange} />
          <NumberInput label="Container" value={container} onChange={onContainerChange} />
        </div>
      </CardContent>
    </Card>
  );
}
