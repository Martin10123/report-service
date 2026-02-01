import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { AuthInit, HomeRedirect, ProtectedRoute, RedirectIfAuthenticated } from '@/components/auth';
import { ROUTES } from '@/constants';

function App() {
  return (
    <BrowserRouter>
      <AuthInit />
      <Routes>
        {/* Rutas de autenticación (redirigen al dashboard si ya hay sesión) */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <RedirectIfAuthenticated>
              <RegisterPage />
            </RedirectIfAuthenticated>
          }
        />

        {/* Rutas protegidas (redirigen a login si no hay sesión) */}
        <Route element={<ProtectedRoute />}>
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
        </Route>

        {/* / y rutas desconocidas: esperan sesión y redirigen a dashboard o login (evita flash) */}
        <Route path={ROUTES.HOME} element={<HomeRedirect />} />
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
