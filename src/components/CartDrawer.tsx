import { useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { CartItemRow } from '@/components/CartItemRow';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { formatPrice } from '@/lib/formatPrice';

/**
 * Transient review panel that opens automatically when an item is added to
 * the cart from any page (see `notifyAdd`). Not a checkout flow — just a
 * quick way to adjust quantity or remove an item without leaving the page.
 */
export function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const { items, total } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(panelRef, isOpen, closeButtonRef);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        data-testid="cart-drawer-backdrop"
        className="fixed inset-0 z-10 bg-basalt/60 transition-opacity duration-150 print:hidden"
        onClick={close}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="animate-drawer-in fixed inset-y-0 right-0 z-20 flex w-full max-w-[400px] flex-col gap-6 border-l border-stone/20 bg-basalt px-6 py-8 print:hidden"
      >
        <div className="flex items-center justify-between">
          <h2 id="cart-drawer-title" className="text-display-lg font-display">
            Carrinho
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Fechar carrinho"
            className="text-stone transition-colors duration-150 hover:text-brass focus-visible:text-brass"
          >
            <IconX size={20} stroke={1.5} aria-hidden />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-body-md font-body text-stone">
            Nenhum prato selecionado ainda.
          </p>
        ) : (
          <>
            <div className="flex-1 divide-y divide-stone/20 overflow-y-auto">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
            <div className="space-y-4 border-t border-stone/20 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-body-md font-body text-stone">Total</span>
                <span className="text-mono-md font-mono text-brass">
                  {formatPrice(total)}
                </span>
              </div>
              <Link
                to="/carrinho"
                onClick={close}
                className="block text-body-sm font-body text-stone transition-colors duration-150 hover:text-ivory focus-visible:text-ivory"
              >
                Ver carrinho completo →
              </Link>
            </div>
          </>
        )}
      </div>
    </>,
    document.body,
  );
}
