import { IconPlus } from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import type { MenuItem } from '@/types/menu';

interface AddToCartButtonProps {
  item: MenuItem;
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { add } = useCart();
  const { notifyAdd } = useCartDrawer();

  return (
    <button
      type="button"
      onClick={() => {
        add(item);
        notifyAdd(item.name);
      }}
      aria-label={`Adicionar ${item.name} ao carrinho`}
      className="shrink-0 text-stone transition-colors duration-150 hover:text-brass focus-visible:text-brass print:hidden"
    >
      <IconPlus size={18} stroke={1.5} aria-hidden />
    </button>
  );
}
