import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

interface NavbarProps {
  userName?: string;
  userLastName?: string;
}

function getInitials(name?: string, lastName?: string): string {
  const first = name?.trim().charAt(0)?.toUpperCase() ?? 'U';
  const last = lastName?.trim().charAt(0)?.toUpperCase() ?? '';
  return last ? `${first}${last}` : first;
}

export function Navbar({ userName = 'Usuario', userLastName = 'Demo' }: NavbarProps) {
  const initials = getInitials(userName, userLastName);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src="/logo-app.webp"
            alt="Logo de la aplicación"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Perfil con iniciales */}
        <Link
          to={ROUTES.PERFIL}
          className="flex items-center gap-3 rounded-xl border border-gray-200/60 bg-white px-3 py-2 shadow-sm transition-all hover:border-gray-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-500/30"
            aria-hidden
          >
            {initials}
          </span>
          <span className="hidden text-sm font-medium text-gray-700 sm:inline">
            Mi perfil
          </span>
        </Link>
      </div>
    </header>
  );
}
