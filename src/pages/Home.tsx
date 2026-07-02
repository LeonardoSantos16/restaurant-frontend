import { useState } from 'react';
import { useFeaturedDish, usePopularDishes } from '@/hooks/useMenu';
import { useMenuSearch } from '@/hooks/useMenuSearch';
import { FeaturedDish } from '@/components/FeaturedDish';
import { CategoryGrid } from '@/components/CategoryGrid';
import { PopularDishCard } from '@/components/PopularDishCard';
import { MenuItemRow } from '@/components/MenuItemRow';

export default function Home() {
  const [query, setQuery] = useState('');
  const isSearching = query.trim().length > 0;

  const { data: featuredDish } = useFeaturedDish();
  const { data: popularDishes } = usePopularDishes(3);
  const { data: results } = useMenuSearch(query);

  return (
    <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar no cardápio…"
        aria-label="Buscar no cardápio"
        className="w-full border-b border-stone/40 bg-transparent py-3 text-body-md font-body text-ivory placeholder:text-stone"
      />

      {isSearching ? (
        <section>
          {results && results.length > 0 ? (
            <ul className="space-y-6">
              {results.map((item) => (
                <li key={item.id}>
                  <MenuItemRow item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body-md font-body text-stone">
              Nenhum prato encontrado para &ldquo;{query}&rdquo;
            </p>
          )}
        </section>
      ) : (
        <>
          {featuredDish && <FeaturedDish dish={featuredDish} />}
          <CategoryGrid />
          <section>
            <h2 className="text-body-lg font-display mb-4">Mais pedidos</h2>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
              {popularDishes?.map((dish) => (
                <li key={dish.id}>
                  <PopularDishCard dish={dish} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
