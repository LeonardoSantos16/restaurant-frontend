import { Link } from 'react-router';
import { Spotlight } from '@/components/Spotlight';
import { formatPrice } from '@/lib/formatPrice';
import type { MenuItem } from '@/types/menu';
import { AddToCartButton } from './AddToCartButton';
import { DishMeta } from './DishMeta';

interface FeaturedMenuItemProps {
  item: MenuItem;
}

/**
 * The one highlighted item per category: circular spotlight (120px) beside the
 * dish info. No wine badge — the spotlight itself signals "destaque".
 */
export function FeaturedMenuItem({ item }: FeaturedMenuItemProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
      <Spotlight
        src={item.imageUrl || '/placeholder-dish.svg'}
        alt={item.name}
        size="featured"
        className="shrink-0 self-center sm:self-auto"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <Link
            to={`/cardapio/${item.id}`}
            className="shrink-0 text-body-lg font-display text-balance"
          >
            {item.name}
          </Link>
          <span
            aria-hidden
            className="flex-1 -translate-y-[0.3em] border-b border-dotted border-stone/40"
          />
          <span className="shrink-0 text-mono-md font-mono text-brass">
            {formatPrice(item.price)}
          </span>
          <AddToCartButton item={item} />
        </div>
        <DishMeta item={item} />
        <p className="mt-1 text-body-sm font-body text-stone text-pretty">
          {item.description}
        </p>
      </div>
    </div>
  );
}
