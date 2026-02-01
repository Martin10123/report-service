import { useState } from 'react';
import {
  AreaPageLayout,
  SummaryCard,
  SillasPersonasSection,
  ServidoresGridCard,
  useSillasPersonas,
} from '@/features/areas';

const INITIAL_SILLAS = {
  totalSillas: 230,
  sillasVacias: 6,
  totalPersonas: 213,
  totalNinos: 4,
};

export function A2Page() {
  const [date] = useState(() => new Date());
  const sillasPersonas = useSillasPersonas(INITIAL_SILLAS);
  const [servidores, setServidores] = useState({
    servidores: 6,
    logistica: 1,
    jesusPlace: 2,
    datafono: 4,
    ministerial: 0,
  });

  const updateServidor = (key: keyof typeof servidores, value: number) => {
    setServidores((prev) => ({ ...prev, [key]: value }));
  };

  const totalServidores =
    servidores.servidores +
    servidores.logistica +
    servidores.jesusPlace +
    servidores.datafono +
    servidores.ministerial;

  return (
    <AreaPageLayout title="Área A2" date={date}>
      <SummaryCard
        totalPersonas={sillasPersonas.data.totalPersonas}
        totalServidores={totalServidores}
      />
      <SillasPersonasSection
        data={sillasPersonas.data}
        onUpdate={sillasPersonas.update}
        ninosLabel="Niños A2"
      />
      <ServidoresGridCard
        title="Servidores"
        fields={[
          { label: 'Servidores', value: servidores.servidores, onChange: (v) => updateServidor('servidores', v) },
          { label: 'Logística', value: servidores.logistica, onChange: (v) => updateServidor('logistica', v) },
          { label: 'Jesus Place', value: servidores.jesusPlace, onChange: (v) => updateServidor('jesusPlace', v) },
          { label: 'Datáfono', value: servidores.datafono, onChange: (v) => updateServidor('datafono', v) },
          { label: 'Ministerial', value: servidores.ministerial, onChange: (v) => updateServidor('ministerial', v) },
        ]}
      />
    </AreaPageLayout>
  );
}
