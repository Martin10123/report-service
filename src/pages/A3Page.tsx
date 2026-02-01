import { useState } from 'react';
import {
  AreaPageLayout,
  SummaryCard,
  SillasPersonasSection,
  ServidoresGridCard,
  useSillasPersonas,
} from '@/features/areas';

const INITIAL_SILLAS = {
  totalSillas: 496,
  sillasVacias: 0,
  totalPersonas: 470,
  totalNinos: 16,
};

export function A3Page() {
  const [date] = useState(() => new Date());
  const sillasPersonas = useSillasPersonas(INITIAL_SILLAS);
  const [servidores, setServidores] = useState({
    servidores: 10,
    logistica: 1,
    consolidacion: 0,
  });

  const updateServidor = (key: keyof typeof servidores, value: number) => {
    setServidores((prev) => ({ ...prev, [key]: value }));
  };

  const totalServidores =
    servidores.servidores + servidores.logistica + servidores.consolidacion;

  return (
    <AreaPageLayout title="Área A3" date={date}>
      <SummaryCard
        totalPersonas={sillasPersonas.data.totalPersonas}
        totalServidores={totalServidores}
      />
      <SillasPersonasSection
        data={sillasPersonas.data}
        onUpdate={sillasPersonas.update}
        ninosLabel="Niños A3"
      />
      <ServidoresGridCard
        title="Servidores"
        fields={[
          { label: 'Servidores', value: servidores.servidores, onChange: (v) => updateServidor('servidores', v) },
          { label: 'Logística', value: servidores.logistica, onChange: (v) => updateServidor('logistica', v) },
          { label: 'Consolidación', value: servidores.consolidacion, onChange: (v) => updateServidor('consolidacion', v) },
        ]}
      />
    </AreaPageLayout>
  );
}
