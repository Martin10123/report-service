import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  LayoutDashboard,
  Hash,
  FileText,
  FolderOpen,
  Layers,
  FileBarChart,
  AlertCircle,
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { ROUTES } from '@/constants';
import { SEDE } from '@/features/areas';
import { useDashboardStore } from '@/stores';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CHART_COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'];

function getSaludo(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

const quickLinks = [
  { path: ROUTES.PRIMER_CONTEO, label: 'Primer conteo', icon: Hash },
  { path: ROUTES.A1, label: 'A1', icon: FileText },
  { path: ROUTES.A2, label: 'A2', icon: FileText },
  { path: ROUTES.A3, label: 'A3', icon: FileText },
  { path: ROUTES.A4, label: 'A4', icon: FileText },
  { path: ROUTES.SOBRES, label: 'Sobres', icon: FolderOpen },
  { path: ROUTES.CONSOLIDADO, label: 'Consolidado', icon: Layers },
  { path: ROUTES.INFORME_FINAL, label: 'Informe final', icon: FileBarChart },
];

export function DashboardPage() {
  const { reporteDelDia, ultimosServicios, fechaServicio } = useDashboardStore();
  const saludo = getSaludo();
  const fecha = fechaServicio ? new Date(fechaServicio + 'T12:00:00') : new Date();
  const dayName = format(fecha, 'EEEE', { locale: es });
  const servicioLabel = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} · ${format(fecha, "d 'de' MMM", { locale: es })}`;

  const completadas = Object.values(reporteDelDia.seccionesCompletas).filter(
    Boolean
  ).length;
  const totalSecciones = 6;
  const estadoReporte =
    completadas === 0
      ? 'Pendiente'
      : completadas < totalSecciones
        ? 'En progreso'
        : 'Completo';

  const alertas: string[] = [];
  if (!reporteDelDia.seccionesCompletas.primerConteo)
    alertas.push('Completa el primer conteo');
  if (!reporteDelDia.seccionesCompletas.a1) alertas.push('Falta registrar A1');
  if (!reporteDelDia.seccionesCompletas.a2) alertas.push('Falta registrar A2');
  if (!reporteDelDia.seccionesCompletas.a3) alertas.push('Falta registrar A3');
  if (!reporteDelDia.seccionesCompletas.a4) alertas.push('Falta registrar A4');
  if (!reporteDelDia.seccionesCompletas.sobres)
    alertas.push('Falta cerrar inventario de sobres');

  // Datos para gráfico de barras por área
  const dataPorArea = reporteDelDia.porArea.map((a) => ({
    name: a.area,
    asistencia: a.asistencia,
    servidores: a.servidores,
    fill: CHART_COLORS[reporteDelDia.porArea.indexOf(a) % CHART_COLORS.length],
  }));

  // Datos para pie adultos vs niños
  const dataAdultosNinos = [
    { name: 'Adultos', value: reporteDelDia.adultos, color: CHART_COLORS[0] },
    { name: 'Niños', value: reporteDelDia.ninos, color: CHART_COLORS[2] },
  ].filter((d) => d.value > 0);

  // Datos para línea/área de últimos servicios (invertidos: más reciente primero en eje)
  const dataUltimosServicios = [...ultimosServicios]
    .reverse()
    .map((s, i) => ({
      fecha: format(new Date(s.fecha + 'T12:00:00'), 'd/MM', { locale: es }),
      asistencia: s.totalAsistencia,
      servicio: s.servicio,
    }));

  const secciones = [
    { key: 'primerConteo', label: 'Primer conteo', done: reporteDelDia.seccionesCompletas.primerConteo },
    { key: 'a1', label: 'Área A1', done: reporteDelDia.seccionesCompletas.a1 },
    { key: 'a2', label: 'Área A2', done: reporteDelDia.seccionesCompletas.a2 },
    { key: 'a3', label: 'Área A3', done: reporteDelDia.seccionesCompletas.a3 },
    { key: 'a4', label: 'Área A4', done: reporteDelDia.seccionesCompletas.a4 },
    { key: 'sobres', label: 'Sobres', done: reporteDelDia.seccionesCompletas.sobres },
  ] as const;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {saludo}, bienvenido al panel de control
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {SEDE}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {servicioLabel}
          </span>
        </div>
      </div>

      {/* Estado del reporte */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            Estado del reporte
          </CardTitle>
          <CardDescription>
            Progreso del reporte del servicio actual
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                estadoReporte === 'Completo'
                  ? 'bg-green-100 text-green-800'
                  : estadoReporte === 'En progreso'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              {estadoReporte === 'Completo' && (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {estadoReporte}
            </span>
            <span className="text-sm text-muted-foreground">
              {completadas} de {totalSecciones} secciones
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {secciones.map(({ label, done }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-md bg-white/60 px-2 py-1 text-xs"
              >
                {done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                {label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total asistencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">
              {reporteDelDia.totalAsistencia}
            </p>
            <p className="text-xs text-muted-foreground">
              {reporteDelDia.adultos} adultos · {reporteDelDia.ninos} niños
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Por área
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">
              {reporteDelDia.porArea.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {reporteDelDia.porArea.map((a) => `${a.area}: ${a.asistencia}`).join(' · ')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total servidores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">
              {reporteDelDia.totalServidores}
            </p>
            <p className="text-xs text-muted-foreground">
              En todas las áreas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sobres entregados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">
              {reporteDelDia.sobresEntregados}
            </p>
            <p className="text-xs text-muted-foreground">
              Inventario del día
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Recharts: contenedor con tamaño fijo para evitar width/height -1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Asistencia por área</CardTitle>
            <CardDescription>Personas por área (hoy)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[240px] w-full min-w-0" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={dataPorArea} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px' }}
                    formatter={(value: number) => [value, 'Asistencia']}
                  />
                  <Bar dataKey="asistencia" name="Asistencia" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Adultos vs niños</CardTitle>
            <CardDescription>Distribución del primer conteo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[240px] w-full min-w-0" style={{ height: 240 }}>
              {dataAdultosNinos.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={dataAdultosNinos}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {dataAdultosNinos.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, 'Personas']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Sin datos aún
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Línea de últimos servicios */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Asistencia en últimos servicios</CardTitle>
          <CardDescription>Evolución de la asistencia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[260px] w-full min-w-0" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={dataUltimosServicios}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAsistencia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px' }}
                  formatter={(value: number, _name, props: { payload: { servicio: string } }) => [
                    value,
                    props?.payload?.servicio ?? 'Asistencia',
                  ]}
                  labelFormatter={(label) => `Fecha: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="asistencia"
                  name="Asistencia"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  fill="url(#colorAsistencia)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Accesos rápidos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Accesos rápidos</CardTitle>
          <CardDescription>Ir a cada sección del reporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {quickLinks.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant="outline"
                className="h-auto w-full flex-col gap-1 py-3 sm:flex-row sm:py-2"
                asChild
              >
                <Link to={path} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                  <ArrowRight className="h-3 w-3 shrink-0 opacity-50 sm:ml-1" />
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Últimos servicios (tabla) */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Últimos servicios</CardTitle>
          <CardDescription>Historial reciente de asistencia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 font-medium">Fecha</th>
                  <th className="px-4 py-2 font-medium">Servicio</th>
                  <th className="px-4 py-2 font-medium">Asistencia</th>
                  <th className="px-4 py-2 font-medium">Servidores</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {ultimosServicios.slice(0, 5).map((s) => (
                  <tr key={s.id} className="border-t border-border">
                    <td className="px-4 py-2">
                      {format(new Date(s.fecha + 'T12:00:00'), "d MMM y", { locale: es })}
                    </td>
                    <td className="px-4 py-2">{s.servicio}</td>
                    <td className="px-4 py-2 font-medium">{s.totalAsistencia}</td>
                    <td className="px-4 py-2">{s.totalServidores}</td>
                    <td className="px-4 py-2">
                      <Link to={ROUTES.INFORME_FINAL}>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Ver
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      {alertas.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-amber-800 dark:text-amber-200">
              <AlertCircle className="h-4 w-4" />
              Recordatorios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {alertas.map((msg) => (
                <li
                  key={msg}
                  className="flex items-center gap-1.5 rounded-md bg-amber-100/80 px-2 py-1 text-sm text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {msg}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {!reporteDelDia.seccionesCompletas.primerConteo && (
                <Link to={ROUTES.PRIMER_CONTEO}>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-800">
                    Ir a primer conteo
                  </Button>
                </Link>
              )}
              <Link to={ROUTES.CONSOLIDADO}>
                <Button size="sm" variant="secondary">
                  Ver consolidado
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
