import { useState, useCallback } from 'react';

export interface SillasPersonasState {
  totalSillas: number;
  sillasVacias: number;
  totalPersonas: number;
  totalNinos: number;
}

export function useSillasPersonas(initial: SillasPersonasState) {
  const [data, setData] = useState<SillasPersonasState>(initial);

  const update = useCallback(
    <K extends keyof SillasPersonasState>(key: K, value: SillasPersonasState[K]) => {
      setData((prev) => {
        const next = { ...prev, [key]: value };
        if (key === 'totalSillas') {
          next.sillasVacias = Math.min(prev.sillasVacias, value as number);
        } else if (key === 'sillasVacias') {
          next.sillasVacias = Math.min(value as number, prev.totalSillas);
        } else if (key === 'totalPersonas') {
          next.totalNinos = Math.min(prev.totalNinos, value as number);
        } else if (key === 'totalNinos') {
          next.totalNinos = Math.min(value as number, prev.totalPersonas);
        }
        return next;
      });
    },
    []
  );

  return { data, update };
}
