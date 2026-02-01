import { useState } from 'react';
import {
  AreaPageLayout,
  SummaryCard,
  SillasPersonasSection,
  ServidoresGridCard,
  ServidorasPastoraCard,
  useSillasPersonas,
} from '@/features/areas';

const INITIAL_SILLAS = {
  totalSillas: 270,
  sillasVacias: 0,
  totalPersonas: 2,
  totalNinos: 0,
};

export function A1Page() {
  const [date] = useState(() => new Date());
  const sillasPersonas = useSillasPersonas(INITIAL_SILLAS);
  const [servidores, setServidores] = useState({
    servidores: 0,
    comunicaciones: 0,
    logistica: 0,
    alabanza: 0,
  });
  const [servidorasPastora, setServidorasPastora] = useState<string[]>(['']);

  const updateServidor = (key: keyof typeof servidores, value: number) => {
    setServidores((prev) => ({ ...prev, [key]: value }));
  };

  const totalServidores =
    servidores.servidores +
    servidores.comunicaciones +
    servidores.logistica +
    servidores.alabanza +
    servidorasPastora.filter((n) => n.trim()).length;

  return (
    <AreaPageLayout title="Área A1" date={date}>
      <SummaryCard
        totalPersonas={sillasPersonas.data.totalPersonas}
        totalServidores={totalServidores}
      />
      <SillasPersonasSection
        data={sillasPersonas.data}
        onUpdate={sillasPersonas.update}
        ninosLabel="Niños A1"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ServidoresGridCard
          title="Servidores"
          fields={[
            { label: 'Servidores', value: servidores.servidores, onChange: (v) => updateServidor('servidores', v) },
            { label: 'Comunicaciones', value: servidores.comunicaciones, onChange: (v) => updateServidor('comunicaciones', v) },
            { label: 'Logística', value: servidores.logistica, onChange: (v) => updateServidor('logistica', v) },
            { label: 'Alabanza', value: servidores.alabanza, onChange: (v) => updateServidor('alabanza', v) },
          ]}
        />
        <ServidorasPastoraCard
          nombres={servidorasPastora}
          onUpdate={(i, v) =>
            setServidorasPastora((prev) => {
              const next = [...prev];
              next[i] = v;
              return next;
            })
          }
          onAdd={() => setServidorasPastora((prev) => [...prev, ''])}
          onRemove={(i) =>
            setServidorasPastora((prev) => prev.filter((_, j) => j !== i))
          }
        />
      </div>
    </AreaPageLayout>
  );
}
