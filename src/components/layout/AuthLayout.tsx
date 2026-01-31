import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  /** true = imagen a la izquierda (ej. Register), false = imagen a la derecha (ej. Login) */
  imageOnLeft?: boolean;
}

export function AuthLayout({
  children,
  imageSrc,
  imageAlt,
  imageOnLeft = false,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 grid grid-cols-1 lg:grid-cols-2 place-items-center p-4 sm:p-6 lg:p-8">
      {/* Col formulario */}
      <main
        className={cn(
          'w-full max-w-xl flex flex-col items-center justify-center lg:pr-8 xl:pr-16',
          imageOnLeft ? 'lg:items-start lg:pl-8 xl:pl-16 order-1 lg:order-2' : 'lg:items-end'
        )}
      >
        {children}
      </main>

      {/* Col imagen: solo desktop */}
      <aside
        className={cn(
          'hidden lg:flex flex-1 items-center justify-center w-full h-full',
          imageOnLeft
            ? 'pr-8 xl:pr-16 order-2 lg:order-1'
            : 'pl-8 xl:pl-16'
        )}
      >
        <div className="relative w-full max-w-lg">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 w-full h-auto object-contain drop-shadow-2xl animate-in zoom-in duration-700"
          />
          <div
            className={cn(
              'absolute inset-0 z-0 rounded-full bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-indigo-400/20 blur-3xl animate-pulse',
              imageOnLeft ? '-left-10' : '-right-10'
            )}
            aria-hidden
          />
        </div>
      </aside>
    </div>
  );
}
