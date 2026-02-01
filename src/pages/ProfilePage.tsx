import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Shield,
  Palette,
  Lock,
  Settings,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/constants';
import { usePerfilStore, getInitials, getNombreCompleto } from '@/stores';
import { useConfigStore } from '@/stores';
import { ROLES_INFO, type UserRole } from '@/types/config';

function getRolBadgeClass(rol: UserRole): string {
  switch (rol) {
    case 'super_admin':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    case 'admin':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
    case 'lider_area':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'servidor':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function ProfilePage() {
  const perfil = usePerfilStore();
  const { preferencias, updatePreferencias, areas } = useConfigStore();
  const [editando, setEditando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: perfil.nombre,
    apellido: perfil.apellido,
    email: perfil.email,
  });

  const handleGuardar = () => {
    usePerfilStore.getState().updatePerfil(formData);
    setEditando(false);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  };

  const handleCancelar = () => {
    setFormData({
      nombre: perfil.nombre,
      apellido: perfil.apellido,
      email: perfil.email,
    });
    setEditando(false);
  };

  const initials = getInitials(perfil.nombre, perfil.apellido);
  const nombreCompleto = getNombreCompleto(perfil.nombre, perfil.apellido);
  const areasAsignadasNombres = perfil.areasAsignadas
    .map((id) => areas.find((a) => a.id === id)?.nombre)
    .filter(Boolean)
    .join(', ') || 'Ninguna';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header con avatar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/25 sm:h-24 sm:w-24 sm:text-3xl">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Mi perfil
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            {nombreCompleto}
          </p>
          <p className="text-sm text-muted-foreground">{perfil.email}</p>
          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getRolBadgeClass(perfil.rol)}`}
          >
            {ROLES_INFO[perfil.rol].label}
          </span>
        </div>
      </div>

      {/* Información personal */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Información personal</CardTitle>
            </div>
            {!editando ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData({
                    nombre: perfil.nombre,
                    apellido: perfil.apellido,
                    email: perfil.email,
                  });
                  setEditando(true);
                }}
              >
                Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancelar}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleGuardar}>
                  <Save className="mr-1 h-4 w-4" />
                  Guardar
                </Button>
              </div>
            )}
          </div>
          <CardDescription>
            Tu nombre y correo (solo front por ahora; al conectar backend se validará)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {guardado && (
            <p className="flex items-center gap-2 rounded-lg bg-green-50 py-2 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Cambios guardados
            </p>
          )}
          {editando ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, nombre: e.target.value }))
                  }
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, apellido: e.target.value }))
                  }
                  placeholder="Tu apellido"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
          ) : (
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Nombre
                </dt>
                <dd className="mt-0.5 font-medium">{perfil.nombre}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Apellido
                </dt>
                <dd className="mt-0.5 font-medium">{perfil.apellido}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-muted-foreground">
                  Correo electrónico
                </dt>
                <dd className="mt-0.5 flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {perfil.email}
                </dd>
              </div>
            </dl>
          )}
        </CardContent>
      </Card>

      {/* Cuenta */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Cuenta</CardTitle>
          </div>
          <CardDescription>
            Rol y áreas asignadas (gestión en Configuración por super admin)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Rol</Label>
            <p className="mt-0.5">
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-medium ${getRolBadgeClass(perfil.rol)}`}
              >
                {ROLES_INFO[perfil.rol].label}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {ROLES_INFO[perfil.rol].descripcion}
            </p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">
              Áreas asignadas
            </Label>
            <p className="mt-0.5 text-sm font-medium">
              {areasAsignadasNombres || '—'}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
            <span className="text-sm font-medium">Estado</span>
            <span
              className={
                perfil.activo
                  ? 'text-sm text-green-600 dark:text-green-400'
                  : 'text-sm text-muted-foreground'
              }
            >
              {perfil.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Preferencias */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Preferencias</CardTitle>
          </div>
          <CardDescription>
            Tema y notificaciones (compartido con Configuración)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="font-medium">Tema</Label>
                <p className="text-xs text-muted-foreground">
                  Apariencia de la aplicación
                </p>
              </div>
            </div>
            <Select
              value={preferencias.tema}
              onValueChange={(value: 'light' | 'dark' | 'system') =>
                updatePreferencias({ tema: value })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Oscuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link to={ROUTES.CONFIGURACION}>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Settings className="mr-2 h-4 w-4" />
              Ir a Configuración
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Seguridad</CardTitle>
          </div>
          <CardDescription>
            Cambio de contraseña y opciones de sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/30 p-4 text-center">
            <Lock className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">
              Cambiar contraseña
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Disponible cuando conectes el backend (login y autenticación).
            </p>
            <Button variant="outline" size="sm" className="mt-3" disabled>
              Próximamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
