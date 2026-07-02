import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useMenu, useMenuItem } from '@/hooks/useMenu';
import { slugify } from '@/lib/categories';
import { formatPrice } from '@/lib/formatPrice';
import { isSoldOut, relatedItems } from '@/lib/menu';
import { CategoryDivider } from '@/components/CategoryDivider';
import { DishMeta } from '@/components/DishMeta';
import { MenuItemRow } from '@/components/MenuItemRow';
import { QuantitySelector } from '@/components/QuantitySelector';
import { Spotlight } from '@/components/Spotlight';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';

export default function MenuItemDetail() {
  const { id = '' } = useParams();
  const { data: item, isLoading, isError } = useMenuItem(id);
  const { data: menu } = useMenu();
  const { add } = useCart();
  const { notifyAdd } = useCartDrawer();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-body-md font-body text-stone">Carregando o prato…</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="mx-auto max-w-3xl space-y-2 px-6 py-12">
        <p className="text-body-md font-body text-stone">
          Prato não encontrado.
        </p>
        <Link
          to="/cardapio"
          className="text-body-md font-body text-brass underline-offset-4 transition-[text-decoration-color] duration-150 hover:underline"
        >
          Ver cardápio
        </Link>
      </div>
    );
  }

  const soldOut = isSoldOut(item);
  const related = relatedItems(menu ?? [], item);

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <Link
        to="/cardapio"
        className="inline-block text-body-sm font-body text-stone transition-colors duration-150 hover:text-brass focus-visible:text-brass"
      >
        ← Voltar ao cardápio
      </Link>

      <article className="space-y-6">
        <div className="flex justify-center">
          <Spotlight
            src={item.imageUrl || '/placeholder-dish.svg'}
            alt={item.name}
            size="hero"
          />
        </div>

        <div className="space-y-3">
          <Link
            to={`/cardapio?categoria=${slugify(item.category)}`}
            className="inline-block text-body-sm font-body uppercase tracking-wide text-stone transition-colors duration-150 hover:text-brass focus-visible:text-brass"
          >
            {item.category}
          </Link>

          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-display-lg font-display text-balance">
              {item.name}
            </h1>
            <span className="shrink-0 text-mono-md font-mono text-brass">
              {formatPrice(item.price)}
            </span>
          </div>

          <DishMeta item={item} />

          <p className="text-body-lg font-body text-pretty">
            {item.description}
          </p>
        </div>

        {soldOut ? (
          <p className="text-body-md font-mono text-wine">esgotado</p>
        ) : (
          <div className="flex flex-wrap items-center gap-6 print:hidden">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={() => {
                add(item, quantity);
                notifyAdd(item.name);
              }}
              className="bg-brass px-6 py-3 text-body-md font-body text-basalt transition-opacity duration-150 hover:opacity-90"
            >
              Adicionar ao carrinho
            </button>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="space-y-6">
          <CategoryDivider label={`Outros de ${item.category}`} />
          <ul className="space-y-6">
            {related.map((other) => (
              <li key={other.id}>
                <MenuItemRow item={other} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
