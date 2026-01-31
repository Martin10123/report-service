import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  ProfilePage,
  PlaceholderPage,
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
        <Route element={<AppLayout userName="Usuario" userLastName="Demo" userEmail="usuario@demo.com" />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PRIMER_CONTEO} element={<PlaceholderPage title="Primer conteo" />} />
          <Route path={ROUTES.A1} element={<PlaceholderPage title="A1" />} />
          <Route path={ROUTES.A2} element={<PlaceholderPage title="A2" />} />
          <Route path={ROUTES.A3} element={<PlaceholderPage title="A3" />} />
          <Route path={ROUTES.A4} element={<PlaceholderPage title="A4" />} />
          <Route path={ROUTES.SOBRES} element={<PlaceholderPage title="Sobres" />} />
          <Route path={ROUTES.SERVICIOS} element={<PlaceholderPage title="Servicios" />} />
          <Route path={ROUTES.CONSOLIDADO} element={<PlaceholderPage title="Consolidado" />} />
          <Route path={ROUTES.INFORME_FINAL} element={<PlaceholderPage title="Informe final" />} />
          <Route path={ROUTES.CONFIGURACION} element={<PlaceholderPage title="Configuracion" />} />
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
