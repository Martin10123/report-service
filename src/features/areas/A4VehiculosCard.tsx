import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';

interface A4VehiculosCardProps {
  vehiculos: number;
  motos: number;
  bicicletas: number;
  onVehiculosChange: (v: number) => void;
  onMotosChange: (v: number) => void;
  onBicicletasChange: (v: number) => void;
}

export function A4VehiculosCard({
  vehiculos,
  motos,
  bicicletas,
  onVehiculosChange,
  onMotosChange,
  onBicicletasChange,
}: A4VehiculosCardProps) {
  const total = vehiculos + motos + bicicletas;

  return (
    <Card>
      <CardHeader className="px-3 pb-2 pt-3">
        <CardTitle className="text-sm">Vehículos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-3 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <NumberInput label="Vehículos" value={vehiculos} onChange={onVehiculosChange} />
          <NumberInput label="Motos" value={motos} onChange={onMotosChange} />
          <NumberInput label="Bicicletas" value={bicicletas} onChange={onBicicletasChange} />
        </div>
        <div className="rounded-lg bg-muted px-3 py-2 text-right">
          <span className="text-sm font-medium text-muted-foreground">TOTAL VEHÍCULOS</span>
          <p className="text-xl font-bold text-foreground">{total}</p>
        </div>
      </CardContent>
    </Card>
  );
}
