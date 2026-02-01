import { useState } from 'react';
import {
  Settings,
  Armchair,
  Mail,
  Users,
  UserCog,
  Palette,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
import { useConfigStore } from '@/stores';
import { ROLES_INFO, type UserRole, type User } from '@/types/config';

// ─────────────────────────────────────────────────────────────────────────────
// Sección: Sillas por Área
// ─────────────────────────────────────────────────────────────────────────────
function SillasAreaSection() {
  const { areas, updateArea, addArea, removeArea } = useConfigStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ nombre: '', totalSillas: 0 });
  const [showAdd, setShowAdd] = useState(false);
  const [newArea, setNewArea] = useState({ nombre: '', totalSillas: 100 });

  const startEdit = (id: string, nombre: string, totalSillas: number) => {
    setEditingId(id);
    setEditValues({ nombre, totalSillas });
  };

  const saveEdit = (id: string) => {
    updateArea(id, editValues);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (newArea.nombre.trim()) {
      addArea({ nombre: newArea.nombre.trim(), totalSillas: newArea.totalSillas });
      setNewArea({ nombre: '', totalSillas: 100 });
      setShowAdd(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Armchair className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Sillas por Área</CardTitle>
        </div>
        <CardDescription>
          Configura el número de sillas disponibles en cada área
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {areas.map((area) => (
          <div
            key={area.id}
            className="flex items-center gap-3 rounded-lg bg-muted/30 p-3"
          >
            {editingId === area.id ? (
              <>
                <Input
                  value={editValues.nombre}
                  onChange={(e) =>
                    setEditValues((p) => ({ ...p, nombre: e.target.value }))
                  }
                  className="h-8 w-24"
                  placeholder="Nombre"
                />
                <Input
                  type="number"
                  value={editValues.totalSillas}
                  onChange={(e) =>
                    setEditValues((p) => ({
                      ...p,
                      totalSillas: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="h-8 w-24"
                  min={0}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => saveEdit(area.id)}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setEditingId(null)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </>
            ) : (
              <>
                <span className="min-w-[60px] font-medium">{area.nombre}</span>
                <span className="flex-1 text-sm text-muted-foreground">
                  {area.totalSillas} sillas
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => startEdit(area.id, area.nombre, area.totalSillas)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => removeArea(area.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ))}

        {showAdd ? (
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-3">
            <Input
              value={newArea.nombre}
              onChange={(e) => setNewArea((p) => ({ ...p, nombre: e.target.value }))}
              className="h-8 w-24"
              placeholder="Nombre"
              autoFocus
            />
            <Input
              type="number"
              value={newArea.totalSillas}
              onChange={(e) =>
                setNewArea((p) => ({ ...p, totalSillas: parseInt(e.target.value) || 0 }))
              }
              className="h-8 w-24"
              min={0}
              placeholder="Sillas"
            />
            <Button size="sm" onClick={handleAdd}>
              Agregar
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar área
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sección: Inventario de Sobres
// ─────────────────────────────────────────────────────────────────────────────
function SobresSection() {
  const { tiposSobres, updateSobre, addSobre, removeSobre, toggleSobre } =
    useConfigStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ nombre: '', inventarioInicial: 0 });
  const [showAdd, setShowAdd] = useState(false);
  const [newSobre, setNewSobre] = useState({ nombre: '', inventarioInicial: 0, activo: true });

  const startEdit = (id: string, nombre: string, inventarioInicial: number) => {
    setEditingId(id);
    setEditValues({ nombre, inventarioInicial });
  };

  const saveEdit = (id: string) => {
    updateSobre(id, editValues);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (newSobre.nombre.trim()) {
      addSobre({
        nombre: newSobre.nombre.trim(),
        inventarioInicial: newSobre.inventarioInicial,
        activo: true,
      });
      setNewSobre({ nombre: '', inventarioInicial: 0, activo: true });
      setShowAdd(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Inventario de Sobres</CardTitle>
        </div>
        <CardDescription>
          Configura los tipos de sobres y su inventario inicial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {tiposSobres.map((sobre) => (
          <div
            key={sobre.id}
            className={`flex items-center gap-3 rounded-lg p-3 ${
              sobre.activo ? 'bg-muted/30' : 'bg-muted/10 opacity-60'
            }`}
          >
            {editingId === sobre.id ? (
              <>
                <Input
                  value={editValues.nombre}
                  onChange={(e) =>
                    setEditValues((p) => ({ ...p, nombre: e.target.value }))
                  }
                  className="h-8 w-28"
                  placeholder="Nombre"
                />
                <Input
                  type="number"
                  value={editValues.inventarioInicial}
                  onChange={(e) =>
                    setEditValues((p) => ({
                      ...p,
                      inventarioInicial: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="h-8 w-24"
                  min={0}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => saveEdit(sobre.id)}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setEditingId(null)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </>
            ) : (
              <>
                <Switch
                  checked={sobre.activo}
                  onCheckedChange={() => toggleSobre(sobre.id)}
                />
                <span className="min-w-[80px] font-medium">{sobre.nombre}</span>
                <span className="flex-1 text-sm text-muted-foreground">
                  Inv. inicial: {sobre.inventarioInicial}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() =>
                    startEdit(sobre.id, sobre.nombre, sobre.inventarioInicial)
                  }
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => removeSobre(sobre.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ))}

        {showAdd ? (
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-3">
            <Input
              value={newSobre.nombre}
              onChange={(e) => setNewSobre((p) => ({ ...p, nombre: e.target.value }))}
              className="h-8 w-28"
              placeholder="Nombre"
              autoFocus
            />
            <Input
              type="number"
              value={newSobre.inventarioInicial}
              onChange={(e) =>
                setNewSobre((p) => ({
                  ...p,
                  inventarioInicial: parseInt(e.target.value) || 0,
                }))
              }
              className="h-8 w-24"
              min={0}
              placeholder="Inv. inicial"
            />
            <Button size="sm" onClick={handleAdd}>
              Agregar
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar tipo de sobre
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sección: Categorías de Servidores
// ─────────────────────────────────────────────────────────────────────────────
function CategoriasServidoresSection() {
  const {
    categoriasServidores,
    updateCategoria,
    addCategoria,
    removeCategoria,
    toggleCategoria,
  } = useConfigStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newNombre, setNewNombre] = useState('');

  const startEdit = (id: string, nombre: string) => {
    setEditingId(id);
    setEditNombre(nombre);
  };

  const saveEdit = (id: string) => {
    updateCategoria(id, { nombre: editNombre });
    setEditingId(null);
  };

  const handleAdd = () => {
    if (newNombre.trim()) {
      addCategoria({ nombre: newNombre.trim(), activo: true });
      setNewNombre('');
      setShowAdd(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Categorías de Servidores</CardTitle>
        </div>
        <CardDescription>
          Gestiona las categorías de servidores disponibles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {categoriasServidores.map((cat) => (
          <div
            key={cat.id}
            className={`flex items-center gap-3 rounded-lg p-3 ${
              cat.activo ? 'bg-muted/30' : 'bg-muted/10 opacity-60'
            }`}
          >
            {editingId === cat.id ? (
              <>
                <Input
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  className="h-8 flex-1"
                  placeholder="Nombre"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => saveEdit(cat.id)}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setEditingId(null)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </>
            ) : (
              <>
                <Switch
                  checked={cat.activo}
                  onCheckedChange={() => toggleCategoria(cat.id)}
                />
                <span className="flex-1 font-medium">{cat.nombre}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => startEdit(cat.id, cat.nombre)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => removeCategoria(cat.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ))}

        {showAdd ? (
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-3">
            <Input
              value={newNombre}
              onChange={(e) => setNewNombre(e.target.value)}
              className="h-8 flex-1"
              placeholder="Nombre de la categoría"
              autoFocus
            />
            <Button size="sm" onClick={handleAdd}>
              Agregar
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar categoría
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sección: Preferencias de Usuario
// ─────────────────────────────────────────────────────────────────────────────
function PreferenciasSection() {
  const { preferencias, updatePreferencias } = useConfigStore();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Preferencias</CardTitle>
        </div>
        <CardDescription>Personaliza tu experiencia en la aplicación</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <div>
            <Label className="font-medium">Tema</Label>
            <p className="text-sm text-muted-foreground">
              Elige el tema de la aplicación
            </p>
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
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sección: Gestión de Usuarios
// ─────────────────────────────────────────────────────────────────────────────
function UsuariosSection() {
  const { usuarios, areas, addUser, updateUser, removeUser, toggleUserActive } =
    useConfigStore();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<User, 'id' | 'createdAt'>>({
    nombre: '',
    apellido: '',
    email: '',
    rol: 'servidor',
    areasAsignadas: [],
    activo: true,
  });

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      rol: 'servidor',
      areasAsignadas: [],
      activo: true,
    });
  };

  const handleAdd = () => {
    if (formData.nombre.trim() && formData.email.trim()) {
      addUser(formData);
      resetForm();
      setShowAdd(false);
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: user.rol,
      areasAsignadas: user.areasAsignadas,
      activo: user.activo,
    });
  };

  const saveEdit = () => {
    if (editingId) {
      updateUser(editingId, formData);
      setEditingId(null);
      resetForm();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const getRolBadgeColor = (rol: UserRole) => {
    switch (rol) {
      case 'super_admin':
        return 'bg-red-100 text-red-700';
      case 'admin':
        return 'bg-orange-100 text-orange-700';
      case 'lider_area':
        return 'bg-blue-100 text-blue-700';
      case 'servidor':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const UserForm = ({ isEditing = false }: { isEditing?: boolean }) => (
    <div className="space-y-4 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData((p) => ({ ...p, nombre: e.target.value }))}
            placeholder="Nombre"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            value={formData.apellido}
            onChange={(e) => setFormData((p) => ({ ...p, apellido: e.target.value }))}
            placeholder="Apellido"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label>Rol</Label>
          <Select
            value={formData.rol}
            onValueChange={(value: UserRole) =>
              setFormData((p) => ({ ...p, rol: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ROLES_INFO).map(([key, info]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    {info.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {ROLES_INFO[formData.rol].descripcion}
          </p>
        </div>

        {(formData.rol === 'lider_area' || formData.rol === 'servidor') && (
          <div className="space-y-1">
            <Label>Áreas asignadas</Label>
            <Select
              value={formData.areasAsignadas[0] || ''}
              onValueChange={(value) =>
                setFormData((p) => ({ ...p, areasAsignadas: [value] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (isEditing) cancelEdit();
            else setShowAdd(false);
            resetForm();
          }}
        >
          Cancelar
        </Button>
        <Button size="sm" onClick={isEditing ? saveEdit : handleAdd}>
          {isEditing ? 'Guardar cambios' : 'Agregar usuario'}
        </Button>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Gestión de Usuarios</CardTitle>
        </div>
        <CardDescription>
          Administra usuarios y sus permisos en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {usuarios.map((user) => (
          <div key={user.id}>
            {editingId === user.id ? (
              <UserForm isEditing />
            ) : (
              <div
                className={`flex flex-col gap-2 rounded-lg p-3 sm:flex-row sm:items-center sm:gap-3 ${
                  user.activo ? 'bg-muted/30' : 'bg-muted/10 opacity-60'
                }`}
              >
                <Switch
                  checked={user.activo}
                  onCheckedChange={() => toggleUserActive(user.id)}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {user.nombre} {user.apellido}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${getRolBadgeColor(
                        user.rol
                      )}`}
                    >
                      {ROLES_INFO[user.rol].label}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => startEdit(user)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  {user.rol !== 'super_admin' && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => removeUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {showAdd ? (
          <UserForm />
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar usuario
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Página Principal de Configuración
// ─────────────────────────────────────────────────────────────────────────────
export function ConfiguracionPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Settings className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Configuración
          </h1>
          <p className="text-sm text-muted-foreground">
            Personaliza y administra tu aplicación
          </p>
        </div>
      </div>

      {/* Secciones en grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SillasAreaSection />
        <SobresSection />
        <CategoriasServidoresSection />
        <PreferenciasSection />
      </div>

      {/* Sección de usuarios (full width) */}
      <UsuariosSection />
    </div>
  );
}
