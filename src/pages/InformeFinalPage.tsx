import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AreaPageLayout } from '@/features/areas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function InformeRow({
  label,
  value,
  total = false,
}: {
  label: string;
  value: string | number;
  total?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-0">
      <span className={`text-sm ${total ? 'font-semibold' : 'text-muted-foreground'}`}>
        {label}
      </span>
      <span className={`text-sm font-semibold ${total ? 'text-foreground' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function InformeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="px-4 pb-2 pt-4">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0 px-4 pb-4">{children}</CardContent>
    </Card>
  );
}

export function InformeFinalPage() {
  const [date] = useState(() => new Date());

  return (
    <AreaPageLayout title="Informe de Servicio Grupo 3" date={date}>
      <div className="w-full space-y-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="grid grid-cols-1 gap-2 px-4 py-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <p className="font-semibold text-foreground sm:col-span-2 lg:col-span-3">Retiro Provisión Día 1</p>
            <p className="text-muted-foreground">{format(date, "d/M/y", { locale: es })}</p>
            <p className="text-muted-foreground">N° Servicio: 0</p>
            <p className="text-muted-foreground">Sede: Villa Grande</p>
            <p className="text-muted-foreground">SÁBADO 07:00 PM</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <InformeBlock title="1️⃣ Asistencia Personas">
            <InformeRow label="En Sillas:" value={470} />
            <InformeRow label="En Gradas:" value={470} />
            <InformeRow label="Niños Auditorio:" value={25} />
            <InformeRow label="Niños Iglekids" value={0} />
            <InformeRow label="Total Auditorio" value={965} total />
          </InformeBlock>

          <InformeBlock title="Area De Servidores">
            <InformeRow label="Servidores:" value={28} />
            <InformeRow label="Consolidación:" value={0} />
            <InformeRow label="Comunicaciones:" value={8} />
            <InformeRow label="Logistica:" value={10} />
            <InformeRow label="Jesus place:" value={2} />
            <InformeRow label="Datafono:" value={4} />
            <InformeRow label="Coffee:" value={2} />
            <InformeRow label="Ministerial:" value={0} />
            <InformeRow label="Alabanza:" value={10} />
            <InformeRow label="VIP:" value={1} />
            <InformeRow label="Iglekids:" value={0} />
            <InformeRow label="Total Área Servidores" value={65} total />
            <InformeRow label="Total Personas Iglesia" value={1030} total />
          </InformeBlock>
        </div>

        <InformeBlock title="2️⃣ Vehículos">
          <InformeRow label="Carros:" value={150} />
          <InformeRow label="Motos:" value={101} />
          <InformeRow label="Bicicletas:" value={4} />
          <InformeRow label="Total Vehículos" value={255} total />
        </InformeBlock>

        <InformeBlock title="3️⃣ Ofrendas">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Canastas Ofrendas</p>
              <InformeRow label="Entregadas:" value={7} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Sobres Ofrendas</p>
              <InformeRow label="Inicial Ofrendas:" value={915} />
              <InformeRow label="Recibidos:" value={400} />
              <InformeRow label="Total:" value={1315} total />
              <InformeRow label="Entregados:" value={183} />
              <InformeRow label="Final Ofrendas:" value={1132} total />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Sobres Protemplo</p>
              <InformeRow label="Inicial Primicias:" value={0} />
              <InformeRow label="Total:" value={0} total />
              <InformeRow label="Final Protemplo:" value={0} total />
              <p className="mb-2 mt-3 text-xs font-medium text-muted-foreground">Sobres Iglekids</p>
              <InformeRow label="Inicial Iglekids:" value={39} />
              <InformeRow label="Recibidos:" value={0} />
              <InformeRow label="Total:" value={39} total />
              <InformeRow label="Entregados:" value={0} />
              <InformeRow label="Final Iglekids:" value={39} total />
            </div>
          </div>
        </InformeBlock>
      </div>
    </AreaPageLayout>
  );
}
