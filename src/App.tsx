import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  ProfilePage,
  PlaceholderPage,
  PrimerConteoPage,
  A1Page,
  A2Page,
  A3Page,
  A4Page,
  SobresPage,
  ConsolidadoPage,
  InformeFinalPage,
  ConfiguracionPage,
} from '@/pages';
import { AppLayout } from '@/components/layout';
import { ROUTES } from '@/constants';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        {/* Rutas con layout (navbar + sidebar) */}
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PRIMER_CONTEO} element={<PrimerConteoPage />} />
          <Route path={ROUTES.A1} element={<A1Page />} />
          <Route path={ROUTES.A2} element={<A2Page />} />
          <Route path={ROUTES.A3} element={<A3Page />} />
          <Route path={ROUTES.A4} element={<A4Page />} />
          <Route path={ROUTES.SOBRES} element={<SobresPage />} />
          <Route path={ROUTES.SERVICIOS} element={<PlaceholderPage title="Servicios" />} />
          <Route path={ROUTES.CONSOLIDADO} element={<ConsolidadoPage />} />
          <Route path={ROUTES.INFORME_FINAL} element={<InformeFinalPage />} />
          <Route path={ROUTES.CONFIGURACION} element={<ConfiguracionPage />} />
          <Route path={ROUTES.PERFIL} element={<ProfilePage />} />
        </Route>

        {/* Redirecciones */}
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
