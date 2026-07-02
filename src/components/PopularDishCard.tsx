import { Link } from 'react-router';
import { formatPrice } from '@/lib/formatPrice';
import type { MenuItem } from '@/types/menu';

interface PopularDishCardProps {
  dish: MenuItem;
}

export function PopularDishCard({ dish }: PopularDishCardProps) {
  return (
    <Link
      to={`/cardapio/${dish.id}`}
      className="block border border-stone/20 p-6 transition-colors duration-150 hover:border-stone/40"
    >
      <h3 className="text-body-lg font-display text-balance">{dish.name}</h3>
      <p className="text-body-sm font-body text-stone mt-1 text-pretty">
        {dish.description}
      </p>
      <p className="text-mono-md font-mono text-brass mt-4">
        {formatPrice(dish.price)}
      </p>
    </Link>
  );
}
