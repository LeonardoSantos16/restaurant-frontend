import { Link } from 'react-router';
import { CartItemRow } from '@/components/CartItemRow';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatPrice';

export default function Cart() {
  const { items, total, clear } = useCart();

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-display-xl font-display">Carrinho</h1>
        <p className="text-body-md font-body text-stone">
          Revise os pratos escolhidos antes de reservar a mesa.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-body-md font-body text-stone">
          Nenhum prato selecionado ainda.{' '}
          <Link
            to="/cardapio"
            className="text-brass underline-offset-4 transition-[text-decoration-color] duration-150 hover:underline"
          >
            Ver cardápio
          </Link>
        </p>
      ) : (
        <div className="space-y-8">
          <div className="divide-y divide-stone/20">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          <div className="flex items-baseline justify-between border-t border-stone/20 pt-6">
            <span className="text-body-md font-body text-stone">Total</span>
            <span className="text-mono-md font-mono text-brass">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex items-center justify-between print:hidden">
            <Link
              to="/reservas"
              className="bg-brass px-6 py-3 text-body-md font-body text-basalt transition-opacity duration-150 hover:opacity-90"
            >
              Reservar uma mesa
            </Link>
            <button
              type="button"
              onClick={clear}
              className="text-body-sm font-body text-stone transition-colors duration-150 hover:text-brass focus-visible:text-brass"
            >
              Esvaziar carrinho
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
