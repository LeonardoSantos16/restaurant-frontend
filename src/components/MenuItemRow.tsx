import { Link } from 'react-router';
import { formatPrice } from '@/lib/formatPrice';
import { isSoldOut } from '@/lib/menu';
import type { MenuItem } from '@/types/menu';
import { AddToCartButton } from './AddToCartButton';
import { DishMeta } from './DishMeta';

interface MenuItemRowProps {
  item: MenuItem;
}

/**
 * Editorial dot-leader row: name … price, description below. Sold-out items are
 * dimmed, non-interactive, and labeled in `wine`; available items link to their
 * detail and expose an inline add-to-cart control.
 */
export function MenuItemRow({ item }: MenuItemRowProps) {
  if (isSoldOut(item)) {
    return (
      <div className="opacity-60">
        <div className="flex items-baseline gap-3">
          <span className="shrink-0 text-body-md font-body">{item.name}</span>
          <span
            aria-hidden
            className="flex-1 -translate-y-[0.3em] border-b border-dotted border-stone/40"
          />
          <span className="shrink-0 text-body-sm font-mono text-wine">
            esgotado
          </span>
        </div>
        <DishMeta item={item} />
        <p className="mt-1 text-body-sm font-body text-stone text-pretty">
          {item.description}
        </p>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="flex items-baseline gap-3">
        <Link
          to={`/cardapio/${item.id}`}
          className="shrink-0 text-body-md font-body text-stone transition-colors duration-150 group-hover:text-ivory"
        >
          {item.name}
        </Link>
        <span
          aria-hidden
          className="flex-1 -translate-y-[0.3em] border-b border-dotted border-stone/40 transition-colors duration-150 group-hover:border-ivory/40"
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
  );
}
