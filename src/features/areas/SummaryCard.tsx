import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardProps {
  totalPersonas: number;
  totalServidores: number;
}

export function SummaryCard({ totalPersonas, totalServidores }: SummaryCardProps) {
  return (
    <Card className="border-accent/30 bg-accent/5">
      <CardContent className="pb-3 pt-3">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-foreground">{totalPersonas}</p>
            <p className="text-xs text-muted-foreground">Total Personas</p>
          </div>
          <div>
            <p className="text-xl font-bold text-accent-foreground">
              {totalServidores}
            </p>
            <p className="text-xs text-muted-foreground">Servidores</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
