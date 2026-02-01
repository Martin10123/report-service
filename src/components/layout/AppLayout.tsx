import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { usePerfilStore } from '@/stores';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { nombre, apellido, email } = usePerfilStore();

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar
        userName={nombre}
        userLastName={apellido}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <div className="flex min-h-[calc(100vh-4rem)] flex-1">
        <Sidebar
          userName={nombre}
          userLastName={apellido}
          userEmail={email}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
