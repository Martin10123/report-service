import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ConfigState,
  AreaConfig,
  SobreConfig,
  CategoriaServidor,
  User,
  PreferenciasUsuario,
} from '@/types/config';

// Datos iniciales por defecto
const DEFAULT_AREAS: AreaConfig[] = [
  { id: 'a1', nombre: 'A1', totalSillas: 270, orden: 1 },
  { id: 'a2', nombre: 'A2', totalSillas: 200, orden: 2 },
  { id: 'a3', nombre: 'A3', totalSillas: 150, orden: 3 },
  { id: 'a4', nombre: 'A4', totalSillas: 100, orden: 4 },
];

const DEFAULT_SOBRES: SobreConfig[] = [
  { id: 'ofrenda', nombre: 'Ofrenda', inventarioInicial: 915, orden: 1, activo: true },
  { id: 'protemplo', nombre: 'Protemplo', inventarioInicial: 0, orden: 2, activo: true },
  { id: 'iglekids', nombre: 'Iglekids', inventarioInicial: 39, orden: 3, activo: true },
];

const DEFAULT_CATEGORIAS_SERVIDORES: CategoriaServidor[] = [
  { id: 'servidores', nombre: 'Servidores', orden: 1, activo: true },
  { id: 'comunicaciones', nombre: 'Comunicaciones', orden: 2, activo: true },
  { id: 'logistica', nombre: 'Logística', orden: 3, activo: true },
  { id: 'alabanza', nombre: 'Alabanza', orden: 4, activo: true },
];

const DEFAULT_USUARIOS: User[] = [
  {
    id: 'super-admin-1',
    nombre: 'Admin',
    apellido: 'Principal',
    email: 'admin@iglesia.com',
    rol: 'super_admin',
    areasAsignadas: [],
    activo: true,
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_PREFERENCIAS: PreferenciasUsuario = {
  tema: 'light',
  notificaciones: true,
};

interface ConfigActions {
  // Áreas
  updateArea: (id: string, updates: Partial<AreaConfig>) => void;
  addArea: (area: Omit<AreaConfig, 'id' | 'orden'>) => void;
  removeArea: (id: string) => void;
  reorderAreas: (areas: AreaConfig[]) => void;

  // Sobres
  updateSobre: (id: string, updates: Partial<SobreConfig>) => void;
  addSobre: (sobre: Omit<SobreConfig, 'id' | 'orden'>) => void;
  removeSobre: (id: string) => void;
  toggleSobre: (id: string) => void;

  // Categorías de servidores
  updateCategoria: (id: string, updates: Partial<CategoriaServidor>) => void;
  addCategoria: (categoria: Omit<CategoriaServidor, 'id' | 'orden'>) => void;
  removeCategoria: (id: string) => void;
  toggleCategoria: (id: string) => void;

  // Usuarios
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  removeUser: (id: string) => void;
  toggleUserActive: (id: string) => void;

  // Preferencias
  updatePreferencias: (updates: Partial<PreferenciasUsuario>) => void;

  // Reset
  resetToDefaults: () => void;
}

type ConfigStore = ConfigState & ConfigActions;

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      // Estado inicial
      areas: DEFAULT_AREAS,
      tiposSobres: DEFAULT_SOBRES,
      categoriasServidores: DEFAULT_CATEGORIAS_SERVIDORES,
      usuarios: DEFAULT_USUARIOS,
      preferencias: DEFAULT_PREFERENCIAS,

      // Acciones para Áreas
      updateArea: (id, updates) =>
        set((state) => ({
          areas: state.areas.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),

      addArea: (area) =>
        set((state) => ({
          areas: [
            ...state.areas,
            { ...area, id: generateId(), orden: state.areas.length + 1 },
          ],
        })),

      removeArea: (id) =>
        set((state) => ({
          areas: state.areas
            .filter((a) => a.id !== id)
            .map((a, i) => ({ ...a, orden: i + 1 })),
        })),

      reorderAreas: (areas) => set({ areas }),

      // Acciones para Sobres
      updateSobre: (id, updates) =>
        set((state) => ({
          tiposSobres: state.tiposSobres.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      addSobre: (sobre) =>
        set((state) => ({
          tiposSobres: [
            ...state.tiposSobres,
            { ...sobre, id: generateId(), orden: state.tiposSobres.length + 1 },
          ],
        })),

      removeSobre: (id) =>
        set((state) => ({
          tiposSobres: state.tiposSobres
            .filter((s) => s.id !== id)
            .map((s, i) => ({ ...s, orden: i + 1 })),
        })),

      toggleSobre: (id) =>
        set((state) => ({
          tiposSobres: state.tiposSobres.map((s) =>
            s.id === id ? { ...s, activo: !s.activo } : s
          ),
        })),

      // Acciones para Categorías de servidores
      updateCategoria: (id, updates) =>
        set((state) => ({
          categoriasServidores: state.categoriasServidores.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      addCategoria: (categoria) =>
        set((state) => ({
          categoriasServidores: [
            ...state.categoriasServidores,
            {
              ...categoria,
              id: generateId(),
              orden: state.categoriasServidores.length + 1,
            },
          ],
        })),

      removeCategoria: (id) =>
        set((state) => ({
          categoriasServidores: state.categoriasServidores
            .filter((c) => c.id !== id)
            .map((c, i) => ({ ...c, orden: i + 1 })),
        })),

      toggleCategoria: (id) =>
        set((state) => ({
          categoriasServidores: state.categoriasServidores.map((c) =>
            c.id === id ? { ...c, activo: !c.activo } : c
          ),
        })),

      // Acciones para Usuarios
      addUser: (user) =>
        set((state) => ({
          usuarios: [
            ...state.usuarios,
            { ...user, id: generateId(), createdAt: new Date().toISOString() },
          ],
        })),

      updateUser: (id, updates) =>
        set((state) => ({
          usuarios: state.usuarios.map((u) =>
            u.id === id ? { ...u, ...updates } : u
          ),
        })),

      removeUser: (id) =>
        set((state) => ({
          usuarios: state.usuarios.filter((u) => u.id !== id),
        })),

      toggleUserActive: (id) =>
        set((state) => ({
          usuarios: state.usuarios.map((u) =>
            u.id === id ? { ...u, activo: !u.activo } : u
          ),
        })),

      // Acciones para Preferencias
      updatePreferencias: (updates) =>
        set((state) => ({
          preferencias: { ...state.preferencias, ...updates },
        })),

      // Reset
      resetToDefaults: () =>
        set({
          areas: DEFAULT_AREAS,
          tiposSobres: DEFAULT_SOBRES,
          categoriasServidores: DEFAULT_CATEGORIAS_SERVIDORES,
          usuarios: DEFAULT_USUARIOS,
          preferencias: DEFAULT_PREFERENCIAS,
        }),
    }),
    {
      name: 'config-storage',
    }
  )
);
