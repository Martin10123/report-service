// Tipos para la configuración de la aplicación

export type UserRole = 'super_admin' | 'admin' | 'lider_area' | 'servidor';

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: UserRole;
  areasAsignadas: string[]; // IDs de las áreas
  activo: boolean;
  createdAt: string;
}

export interface AreaConfig {
  id: string;
  nombre: string;
  totalSillas: number;
  orden: number;
}

export interface SobreConfig {
  id: string;
  nombre: string;
  inventarioInicial: number;
  orden: number;
  activo: boolean;
}

export interface CategoriaServidor {
  id: string;
  nombre: string;
  orden: number;
  activo: boolean;
}

export interface PreferenciasUsuario {
  tema: 'light' | 'dark' | 'system';
  notificaciones: boolean;
}

export interface ConfigState {
  // Áreas y sillas
  areas: AreaConfig[];
  
  // Sobres
  tiposSobres: SobreConfig[];
  
  // Categorías de servidores
  categoriasServidores: CategoriaServidor[];
  
  // Usuarios (gestión)
  usuarios: User[];
  
  // Preferencias
  preferencias: PreferenciasUsuario;
}

// Roles con sus permisos (para referencia en UI)
export const ROLES_INFO: Record<UserRole, { label: string; descripcion: string; permisos: string[] }> = {
  super_admin: {
    label: 'Super Admin',
    descripcion: 'Acceso total al sistema',
    permisos: ['crear_usuarios', 'editar_config', 'ver_reportes', 'editar_datos', 'eliminar_datos'],
  },
  admin: {
    label: 'Administrador',
    descripcion: 'Gestión general sin acceso a configuración avanzada',
    permisos: ['ver_reportes', 'editar_datos', 'crear_usuarios'],
  },
  lider_area: {
    label: 'Líder de Área',
    descripcion: 'Gestión de su área asignada',
    permisos: ['ver_reportes', 'editar_datos_area'],
  },
  servidor: {
    label: 'Servidor',
    descripcion: 'Solo puede ingresar datos en su área',
    permisos: ['editar_datos_area'],
  },
};
