import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ROUTES } from '@/constants';
import { usePerfilStore, getInitials, getNombreCompleto } from '@/stores';
import { signOut } from '@/services/supabase';
import { cn } from '@/lib/utils';

interface UserMenuPopoverProps {
  /** Clase para el trigger (avatar + texto) */
  triggerClassName?: string;
  /** Mostrar texto "Mi perfil" junto al avatar */
  showLabel?: boolean;
}

export function UserMenuPopover({
  triggerClassName,
  showLabel = true,
}: UserMenuPopoverProps) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const { nombre, apellido, email } = usePerfilStore();
  const initials = getInitials(nombre, apellido);
  const fullName = getNombreCompleto(nombre, apellido);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      navigate(ROUTES.LOGIN, { replace: true });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex shrink-0 items-center gap-3 rounded-xl border border-gray-200/60 bg-white px-2 py-1.5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] sm:px-3 sm:py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring',
            triggerClassName
          )}
          aria-label="Abrir menú de usuario"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white shadow-md shadow-blue-500/30 sm:h-9 sm:w-9 sm:text-sm"
            aria-hidden
          >
            {initials}
          </span>
          {showLabel && (
            <span className="hidden text-sm font-medium text-gray-700 sm:inline">
              Mi perfil
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end" sideOffset={8}>
        <div className="px-2 py-2">
          <p className="truncate font-medium text-foreground">{fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
        <div className="my-1 h-px bg-border" />
        <Link to={ROUTES.PERFIL}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 font-normal"
            size="sm"
            asChild
          >
            <span>
              <User className="h-4 w-4" />
              Mi perfil
            </span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 font-normal text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          size="sm"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Cerrar sesión
        </Button>
      </PopoverContent>
    </Popover>
  );
}
