import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';

export interface ServidorField {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

interface ServidoresGridCardProps {
  title: string;
  fields: ServidorField[];
  columns?: 2 | 3 | 4;
}

export function ServidoresGridCard({
  title,
  fields,
  columns = 2,
}: ServidoresGridCardProps) {
  return (
    <Card>
      <CardHeader className="px-3 pb-2 pt-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {fields.map(({ label, value, onChange }) => (
            <NumberInput
              key={label}
              label={label}
              value={value}
              onChange={onChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
