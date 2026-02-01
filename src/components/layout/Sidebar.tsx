import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import {
  LayoutDashboard,
  Hash,
  FileText,
  FolderOpen,
  Layers,
  FileBarChart,
  Settings,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function getInitials(name?: string, lastName?: string): string {
  const first = name?.trim().charAt(0)?.toUpperCase() ?? 'U';
  const last = lastName?.trim().charAt(0)?.toUpperCase() ?? '';
  return last ? `${first}${last}` : first;
}

const menuItems = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { path: ROUTES.PRIMER_CONTEO, label: 'Primer conteo', icon: Hash },
  { path: ROUTES.A1, label: 'A1', icon: FileText },
  { path: ROUTES.A2, label: 'A2', icon: FileText },
  { path: ROUTES.A3, label: 'A3', icon: FileText },
  { path: ROUTES.A4, label: 'A4', icon: FileText },
  { path: ROUTES.SOBRES, label: 'Sobres', icon: FolderOpen },
  { path: ROUTES.CONSOLIDADO, label: 'Consolidado', icon: Layers },
  { path: ROUTES.INFORME_FINAL, label: 'Informe final', icon: FileBarChart },
  { path: ROUTES.CONFIGURACION, label: 'Configuracion', icon: Settings },
];

export function Sidebar({
  userName = 'Usuario',
  userLastName = 'Demo',
  userEmail = 'usuario@demo.com',
  open = false,
  onClose,
}: {
  userName?: string;
  userLastName?: string;
  userEmail?: string;
  open?: boolean;
  onClose?: () => void;
}) {
  const initials = getInitials(userName, userLastName);
  const fullName = [userName, userLastName].filter(Boolean).join(' ').trim() || 'Usuario';
  const location = useLocation();

  // Cerrar sidebar al navegar (mobile)
  useEffect(() => {
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo cerrar al cambiar ruta
  }, [location.pathname]);

  const sidebarContent = (
    <>
      <nav className="flex flex-1 flex-col gap-1 overflow-x-hidden p-4">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-blue-600! text-white shadow-md shadow-blue-500/20'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}

        <div className="flex-1" />

        <div className="border-t border-gray-200/60 px-4 pt-4 mt-2 space-y-1">
          <NavLink
            to={ROUTES.PERFIL}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl py-3 px-4 transition-all',
                isActive
                  ? 'bg-blue-600! shadow-md shadow-blue-500/20'
                  : 'hover:bg-gray-100'
              )
            }
            title="Ir a mi perfil"
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold shadow-md',
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-600 text-white shadow-blue-500/30'
                  )}
                >
                  {initials}
                </span>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className={cn(
                    'truncate text-sm font-medium',
                    isActive ? 'text-white' : 'text-gray-900'
                  )}>
                    {fullName}
                  </p>
                  <p className={cn(
                    'truncate text-xs',
                    isActive ? 'text-blue-100' : 'text-gray-500'
                  )}>
                    {userEmail}
                  </p>
                </div>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </>
  );

  const asideClass = cn(
    'flex flex-col overflow-x-hidden border-r border-gray-200/60',
    'lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:bg-white/80 lg:backdrop-blur-xl',
    'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-[9999] max-lg:h-full max-lg:w-[80%] max-lg:max-w-sm max-lg:bg-white max-lg:transition-transform max-lg:duration-200 max-lg:ease-out',
    open ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
  );

  return (
    <>
      {/* Overlay móvil: fondo oscuro */}
      {open && (
        <div
          className="fixed inset-0 z-9998 bg-black/70 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* Sidebar: en desktop barra lateral, en móvil pantalla completa */}
      <aside className={asideClass}>
        {/* Botón cerrar solo en móvil */}
        <div className="flex items-center justify-between border-b border-gray-200/60 px-4 py-3 lg:hidden">
          <span className="text-sm font-medium text-gray-700">Menú</span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar menú">
            <X className="size-5" />
          </Button>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}
