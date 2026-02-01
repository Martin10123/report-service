import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole } from '@/types/config';

export interface PerfilUsuario {
  nombre: string;
  apellido: string;
  email: string;
  rol: UserRole;
  areasAsignadas: string[];
  activo: boolean;
}

const DEFAULT_PERFIL: PerfilUsuario = {
  nombre: 'Usuario',
  apellido: 'Demo',
  email: 'usuario@demo.com',
  rol: 'servidor',
  areasAsignadas: [],
  activo: true,
};

interface PerfilActions {
  updatePerfil: (updates: Partial<PerfilUsuario>) => void;
  setPerfil: (perfil: PerfilUsuario) => void;
  resetPerfil: () => void;
}

export const usePerfilStore = create<PerfilUsuario & PerfilActions>()(
  persist(
    (set) => ({
      ...DEFAULT_PERFIL,

      updatePerfil: (updates) => set((state) => ({ ...state, ...updates })),

      setPerfil: (perfil) => set(perfil),

      resetPerfil: () => set(DEFAULT_PERFIL),
    }),
    { name: 'perfil-usuario' }
  )
);

export function getInitials(nombre: string, apellido: string): string {
  const first = nombre?.trim().charAt(0)?.toUpperCase() ?? 'U';
  const last = apellido?.trim().charAt(0)?.toUpperCase() ?? '';
  return last ? `${first}${last}` : first;
}

export function getNombreCompleto(nombre: string, apellido: string): string {
  return [nombre, apellido].filter(Boolean).join(' ').trim() || 'Usuario';
}
