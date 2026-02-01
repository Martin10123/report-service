import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TableSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function TableSection({ title, subtitle, children }: TableSectionProps) {
  return (
    <Card>
      <CardHeader className="px-4 pb-2 pt-4">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent className="overflow-x-auto px-4 pb-4">
        {children}
      </CardContent>
    </Card>
  );
}

export function TableHeaderRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-border bg-primary/90 text-primary-foreground">
      {children}
    </tr>
  );
}

export function TableHeaderCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-3 py-2 text-left text-xs font-semibold first:rounded-tl-md last:rounded-tr-md ${className ?? ''}`}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`border-b border-border px-3 py-2 text-sm ${className ?? ''}`}>
      {children}
    </td>
  );
}
