import { Link, useSearchParams } from 'react-router';
import { CATEGORIES } from '@/lib/categories';

function chipClass(isActive: boolean): string {
  return `text-body-sm font-body transition-colors duration-150 ${
    isActive ? 'text-brass' : 'text-stone hover:text-ivory'
  }`;
}

/** Category chips that read/write the `?categoria` query param. */
export function CategoryFilter() {
  const [searchParams] = useSearchParams();
  const active = searchParams.get('categoria');

  return (
    <nav
      aria-label="Filtrar por categoria"
      className="flex flex-wrap gap-x-5 gap-y-2 print:hidden"
    >
      <Link
        to="/cardapio"
        className={chipClass(!active)}
        aria-current={!active ? 'true' : undefined}
      >
        Tudo
      </Link>
      {CATEGORIES.map(({ label, slug }) => {
        const isActive = active === slug;
        return (
          <Link
            key={slug}
            to={`/cardapio?categoria=${slug}`}
            className={chipClass(isActive)}
            aria-current={isActive ? 'true' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
