import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ServidorasPastoraCardProps {
  nombres: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function ServidorasPastoraCard({
  nombres,
  onUpdate,
  onAdd,
  onRemove,
}: ServidorasPastoraCardProps) {
  return (
    <Card>
      <CardHeader className="px-3 pb-2 pt-3">
        <CardTitle className="text-sm">Servidoras de Pastora</CardTitle>
        <p className="text-xs font-normal text-muted-foreground">
          Puede haber más de una
        </p>
      </CardHeader>
      <CardContent className="space-y-2 px-3 pb-3">
        {nombres.map((nombre, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-lg bg-muted/30 p-2"
          >
            <Input
              value={nombre}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder="Nombre de la servidora"
              className="h-9 min-w-0 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(index)}
              disabled={nombres.length <= 1}
              aria-label="Quitar servidora"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
          Agregar servidora
        </Button>
      </CardContent>
    </Card>
  );
}
