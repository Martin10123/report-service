import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';

interface A4IglekidsCardProps {
  coordinadoras: number;
  supervisoras: number;
  maestros: number;
  recrearte: number;
  regikids: number;
  logikids: number;
  saludKids: number;
  yoSoy: number;
  ninos: number;
  onCoordinadorasChange: (v: number) => void;
  onSupervisorasChange: (v: number) => void;
  onMaestrosChange: (v: number) => void;
  onRecrearteChange: (v: number) => void;
  onRegikidsChange: (v: number) => void;
  onLogikidsChange: (v: number) => void;
  onSaludKidsChange: (v: number) => void;
  onYSoyChange: (v: number) => void;
  onNinosChange: (v: number) => void;
}

export function A4IglekidsCard(props: A4IglekidsCardProps) {
  const totalApoyo =
    props.recrearte + props.regikids + props.logikids + props.saludKids + props.yoSoy;
  const totalAreaIglekids =
    props.coordinadoras + props.supervisoras + props.maestros + totalApoyo;

  return (
    <Card>
      <CardHeader className="px-3 pb-2 pt-3">
        <CardTitle className="text-sm">IGLEKIDS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <NumberInput label="Coordinadoras" value={props.coordinadoras} onChange={props.onCoordinadorasChange} />
          <NumberInput label="Supervisoras" value={props.supervisoras} onChange={props.onSupervisorasChange} />
          <NumberInput label="Maestros" value={props.maestros} onChange={props.onMaestrosChange} />
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Personal de Apoyo</p>
          <div className="grid grid-cols-2 gap-2">
            <NumberInput label="Recrearte" value={props.recrearte} onChange={props.onRecrearteChange} />
            <NumberInput label="Regikids" value={props.regikids} onChange={props.onRegikidsChange} />
            <NumberInput label="Logikids" value={props.logikids} onChange={props.onLogikidsChange} />
            <NumberInput label="Salud Kids" value={props.saludKids} onChange={props.onSaludKidsChange} />
            <NumberInput label="Yo Soy" value={props.yoSoy} onChange={props.onYSoyChange} />
          </div>
          <div className="mt-2 rounded-lg bg-muted px-3 py-2 text-right">
            <span className="text-xs font-medium text-muted-foreground">Total Apoyo</span>
            <p className="text-lg font-bold text-foreground">{totalApoyo}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted px-3 py-2 text-right">
            <span className="text-xs font-medium text-muted-foreground">Total área Iglekids</span>
            <p className="text-lg font-bold text-foreground">{totalAreaIglekids}</p>
          </div>
          <div className="rounded-lg bg-muted/80 p-2">
            <NumberInput label="Niños" value={props.ninos} onChange={props.onNinosChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
