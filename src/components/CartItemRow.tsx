import { IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router';
import { formatPrice } from '@/lib/formatPrice';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCart, type CartItem } from '@/context/CartContext';

interface CartItemRowProps {
  item: CartItem;
}

/**
 * Shared row for both the cart page and the cart drawer: name, line price,
 * a quantity selector, and a dedicated remove action (distinct from
 * decrementing quantity to zero).
 */
export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="space-y-2 py-4 print:hidden">
      <div className="flex items-baseline gap-3">
        <Link
          to={`/cardapio/${item.id}`}
          className="shrink-0 text-body-md font-body text-stone transition-colors duration-150 hover:text-ivory focus-visible:text-ivory"
        >
          {item.name}
        </Link>
        <span
          aria-hidden
          className="flex-1 -translate-y-[0.3em] border-b border-dotted border-stone/40"
        />
        <span className="shrink-0 text-mono-md font-mono text-brass">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
      <p className="text-body-sm font-body text-stone text-pretty">
        {item.description}
      </p>
      <div className="flex items-center justify-between">
        <QuantitySelector
          value={item.quantity}
          onChange={(quantity) => updateQuantity(item.id, quantity)}
        />
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`Remover ${item.name} do carrinho`}
          className="text-stone transition-colors duration-150 hover:text-brass focus-visible:text-brass"
        >
          <IconTrash size={18} stroke={1.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}
