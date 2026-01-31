import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import {
  LayoutDashboard,
  Hash,
  FileText,
  FolderOpen,
  Wrench,
  Layers,
  FileBarChart,
  Settings,
} from 'lucide-react';
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
  { path: ROUTES.SERVICIOS, label: 'Servicios', icon: Wrench },
  { path: ROUTES.CONSOLIDADO, label: 'Consolidado', icon: Layers },
  { path: ROUTES.INFORME_FINAL, label: 'Informe final', icon: FileBarChart },
  { path: ROUTES.CONFIGURACION, label: 'Configuracion', icon: Settings },
];

export function Sidebar({
  userName = 'Usuario',
  userLastName = 'Demo',
  userEmail = 'usuario@demo.com',
}: {
  userName?: string;
  userLastName?: string;
  userEmail?: string;
}) {
  const initials = getInitials(userName, userLastName);
  const fullName = [userName, userLastName].filter(Boolean).join(' ').trim() || 'Usuario';

  return (
    <aside className="sticky top-16 flex h-[calc(100vh-4rem)] w-64 shrink-0 flex-col overflow-x-hidden border-r border-gray-200/60 bg-white/80 backdrop-blur-xl">
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

        {/* Spacer para empujar las iniciales abajo */}
        <div className="flex-1" />

        {/* Perfil del usuario al final del sidebar */}
        <NavLink
          to={ROUTES.PERFIL}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl border-t border-gray-200/60 px-4 pt-4 mt-2 py-3 transition-all',
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
      </nav>
    </aside>
  );
}
