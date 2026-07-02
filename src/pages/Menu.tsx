import { IconPrinter } from '@tabler/icons-react';
import { Link, useSearchParams } from 'react-router';
import { useMenu } from '@/hooks/useMenu';
import { CATEGORIES, categoryFromSlug } from '@/lib/categories';
import { CategoryDivider } from '@/components/CategoryDivider';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FeaturedMenuItem } from '@/components/FeaturedMenuItem';
import { MenuItemRow } from '@/components/MenuItemRow';

export default function Menu() {
  const { data, isLoading, isError } = useMenu();
  const [searchParams] = useSearchParams();

  const activeSlug = searchParams.get('categoria');
  const activeLabel = activeSlug ? categoryFromSlug(activeSlug) : null;

  const groups = CATEGORIES.map(({ label }) => ({
    label,
    items: (data ?? []).filter((item) => item.category === label),
  })).filter((group) => group.items.length > 0);

  const filterHasResults =
    !activeSlug ||
    (activeLabel != null && groups.some((g) => g.label === activeLabel));

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-display-xl font-display">Cardápio</h1>
          <p className="text-body-md font-body text-stone">
            Pratos preparados na brasa e no forno a lenha.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex shrink-0 items-center gap-2 text-body-sm font-body text-stone transition-colors duration-150 hover:text-brass focus-visible:text-brass print:hidden"
        >
          <IconPrinter size={18} stroke={1.5} aria-hidden />
          Imprimir cardápio
        </button>
      </header>

      <CategoryFilter />

      {isLoading && (
        <p className="text-body-md font-body text-stone">
          Carregando o cardápio…
        </p>
      )}

      {isError && (
        <p className="text-body-md font-body text-stone">
          Não foi possível carregar o cardápio. Tente novamente.
        </p>
      )}

      {!isLoading && !isError && !filterHasResults && (
        <div className="space-y-2">
          <p className="text-body-md font-body text-stone">
            Nenhum prato nesta categoria.
          </p>
          <Link
            to="/cardapio"
            className="text-body-md font-body text-brass underline-offset-4 transition-[text-decoration-color] duration-150 hover:underline"
          >
            Ver tudo
          </Link>
        </div>
      )}

      {!isLoading &&
        !isError &&
        filterHasResults &&
        groups.map((group) => {
          const firstFeatured = group.items.findIndex((item) => item.featured);
          // When filtered, keep other groups in the DOM but hidden on screen so
          // the print layout can still show the complete menu.
          const hiddenOnScreen =
            activeLabel != null && group.label !== activeLabel;

          return (
            <section
              key={group.label}
              className={`space-y-6 ${hiddenOnScreen ? 'hidden print:block' : ''}`}
            >
              <CategoryDivider label={group.label} />
              <ul className="space-y-6">
                {group.items.map((item, index) => (
                  <li key={item.id}>
                    {item.featured && index === firstFeatured ? (
                      <FeaturedMenuItem item={item} />
                    ) : (
                      <MenuItemRow item={item} />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
    </div>
  );
}
