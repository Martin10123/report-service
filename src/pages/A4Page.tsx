import { useState } from 'react';
import {
  AreaPageLayout,
  A4ExterioresCard,
  A4VehiculosCard,
  A4IglekidsCard,
} from '@/features/areas';

const INITIAL_EXTERIORES = { servidores: 4, logistica: 4, coffe: 2, container: 11 };
const INITIAL_VEHICULOS = { vehiculos: 150, motos: 101, bicicletas: 4 };
const INITIAL_IGLEKIDS = {
  coordinadoras: 0,
  supervisoras: 0,
  maestros: 0,
  recrearte: 0,
  regikids: 0,
  logikids: 0,
  saludKids: 0,
  yoSoy: 0,
  ninos: 0,
};

export function A4Page() {
  const [date] = useState(() => new Date());
  const [exteriores, setExteriores] = useState(INITIAL_EXTERIORES);
  const [vehiculos, setVehiculos] = useState(INITIAL_VEHICULOS);
  const [iglekids, setIglekids] = useState(INITIAL_IGLEKIDS);

  return (
    <AreaPageLayout title="Área A4" date={date}>
      <div className="space-y-3">
        <A4ExterioresCard
          servidores={exteriores.servidores}
          logistica={exteriores.logistica}
          coffe={exteriores.coffe}
          container={exteriores.container}
          onServidoresChange={(v) => setExteriores((p) => ({ ...p, servidores: v }))}
          onLogisticaChange={(v) => setExteriores((p) => ({ ...p, logistica: v }))}
          onCoffeChange={(v) => setExteriores((p) => ({ ...p, coffe: v }))}
          onContainerChange={(v) => setExteriores((p) => ({ ...p, container: v }))}
        />
        <A4VehiculosCard
          vehiculos={vehiculos.vehiculos}
          motos={vehiculos.motos}
          bicicletas={vehiculos.bicicletas}
          onVehiculosChange={(v) => setVehiculos((p) => ({ ...p, vehiculos: v }))}
          onMotosChange={(v) => setVehiculos((p) => ({ ...p, motos: v }))}
          onBicicletasChange={(v) => setVehiculos((p) => ({ ...p, bicicletas: v }))}
        />
        <A4IglekidsCard
          coordinadoras={iglekids.coordinadoras}
          supervisoras={iglekids.supervisoras}
          maestros={iglekids.maestros}
          recrearte={iglekids.recrearte}
          regikids={iglekids.regikids}
          logikids={iglekids.logikids}
          saludKids={iglekids.saludKids}
          yoSoy={iglekids.yoSoy}
          ninos={iglekids.ninos}
          onCoordinadorasChange={(v) => setIglekids((p) => ({ ...p, coordinadoras: v }))}
          onSupervisorasChange={(v) => setIglekids((p) => ({ ...p, supervisoras: v }))}
          onMaestrosChange={(v) => setIglekids((p) => ({ ...p, maestros: v }))}
          onRecrearteChange={(v) => setIglekids((p) => ({ ...p, recrearte: v }))}
          onRegikidsChange={(v) => setIglekids((p) => ({ ...p, regikids: v }))}
          onLogikidsChange={(v) => setIglekids((p) => ({ ...p, logikids: v }))}
          onSaludKidsChange={(v) => setIglekids((p) => ({ ...p, saludKids: v }))}
          onYSoyChange={(v) => setIglekids((p) => ({ ...p, yoSoy: v }))}
          onNinosChange={(v) => setIglekids((p) => ({ ...p, ninos: v }))}
        />
      </div>
    </AreaPageLayout>
  );
}
