interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-base text-gray-600">{description}</p>
        )}
      </div>
      <div className="rounded-3xl border border-gray-200/60 bg-white/80 backdrop-blur-xl p-8 shadow-xl shadow-gray-900/5">
        <p className="text-gray-600">Contenido próximamente.</p>
      </div>
    </div>
  );
}
