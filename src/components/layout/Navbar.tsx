import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { UserMenuPopover } from './UserMenuPopover';

interface NavbarProps {
  userName?: string;
  userLastName?: string;
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex h-full items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        {/* Menú mobile + Logo */}
        <div className="flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </Button>
          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center gap-2 transition-opacity hover:opacity-80 min-w-0"
          >
            <img
              src="/logo-app.webp"
              alt="Logo de la aplicación"
              className="h-8 w-auto object-contain shrink-0 sm:h-9"
            />
          </Link>
        </div>

        {/* Centro (fecha u otro) */}
        <div className="flex min-w-0 flex-1 items-center justify-center" />

        {/* Menú usuario */}
        <div className="flex shrink-0 items-center">
          <UserMenuPopover showLabel />
        </div>
      </div>
    </header>
  );
}
