import { IconMinus, IconPlus } from '@tabler/icons-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  /** Lower bound; the decrement control is disabled at this value. Defaults to 1. */
  min?: number;
}

/**
 * Controlled stepper (− N +) for the dish detail buy action. Stays in `stone` so
 * the brass "Adicionar ao carrinho" CTA remains the sole accent beside the price.
 */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
}: QuantitySelectorProps) {
  const atMin = value <= min;

  return (
    <div className="flex items-center gap-4 text-stone">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={atMin}
        aria-label="Diminuir quantidade"
        className="transition-colors duration-150 hover:text-brass focus-visible:text-brass disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-stone"
      >
        <IconMinus size={18} stroke={1.5} aria-hidden />
      </button>
      <span
        aria-live="polite"
        className="min-w-[1.5ch] text-center text-mono-md font-mono text-ivory"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar quantidade"
        className="transition-colors duration-150 hover:text-brass focus-visible:text-brass"
      >
        <IconPlus size={18} stroke={1.5} aria-hidden />
      </button>
    </div>
  );
}
