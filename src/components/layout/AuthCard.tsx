import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-3xl border border-gray-200/60 bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-gray-900/10 ring-1 ring-gray-900/5',
        className
      )}
    >
      {children}
    </div>
  );
}
