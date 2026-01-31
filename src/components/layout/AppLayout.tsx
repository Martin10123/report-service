import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  userName?: string;
  userLastName?: string;
  userEmail?: string;
}

export function AppLayout({ userName, userLastName, userEmail }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar userName={userName} userLastName={userLastName} />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar userName={userName} userLastName={userLastName} userEmail={userEmail} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
