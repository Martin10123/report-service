import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { SEDE } from './constants';

interface AreaPageLayoutProps {
  title: string;
  date?: Date;
  children: React.ReactNode;
}

export function AreaPageLayout({
  title,
  date = new Date(),
  children,
}: AreaPageLayoutProps) {
  return (
    <div className="h-full w-full p-4 lg:p-6">
      <div className="space-y-3 animate-in fade-in duration-500">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold tracking-tight text-foreground m-0 sm:text-2xl">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {SEDE}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {format(date, "d 'de' MMM 'de' y", { locale: es })}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
