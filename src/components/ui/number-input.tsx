import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Variante compacta para tablas/desktop: sin label, botones e input más pequeños */
  compact?: boolean;
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 9999,
  compact = false,
}: NumberInputProps) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    if (newValue >= min && newValue <= max) onChange(newValue);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1 rounded-md bg-muted/30 p-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-6 w-6 shrink-0 rounded-full bg-transparent"
          onClick={handleDecrement}
          disabled={value <= min}
        >
          <Minus className="h-2.5 w-2.5" />
        </Button>
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="h-6 w-14 text-center text-xs font-semibold [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          min={min}
          max={max}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-6 w-6 shrink-0 rounded-full bg-transparent"
          onClick={handleIncrement}
          disabled={value >= max}
        >
          <Plus className="h-2.5 w-2.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 rounded-lg bg-muted/30 p-2">
      <span className="truncate text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7 shrink-0 rounded-full bg-transparent"
          onClick={handleDecrement}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="h-7 text-center text-sm font-semibold [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          min={min}
          max={max}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7 shrink-0 rounded-full bg-transparent"
          onClick={handleIncrement}
          disabled={value >= max}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
