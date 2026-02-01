// Export Zustand stores
export { useAuthStore, useAuth } from './authStore';
export { useConfigStore } from './configStore';
export { useDashboardStore } from './dashboardStore';
export type { ReporteDelDia, ServicioResumen } from './dashboardStore';
export { usePerfilStore, getInitials, getNombreCompleto } from './perfilStore';
export type { PerfilUsuario } from './perfilStore';