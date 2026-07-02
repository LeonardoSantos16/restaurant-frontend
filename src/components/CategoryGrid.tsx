import { Link } from 'react-router';
import {
  IconToolsKitchen2,
  IconMeat,
  IconGlassFull,
  IconIceCream2,
  type TablerIcon,
} from '@tabler/icons-react';

interface Category {
  label: string;
  slug: string;
  icon: TablerIcon;
}

const CATEGORIES: Category[] = [
  { label: 'Entradas', slug: 'entradas', icon: IconToolsKitchen2 },
  { label: 'Principais', slug: 'principais', icon: IconMeat },
  { label: 'Vinhos', slug: 'vinhos', icon: IconGlassFull },
  { label: 'Sobremesas', slug: 'sobremesas', icon: IconIceCream2 },
];

export function CategoryGrid() {
  return (
    <section>
      <h2 className="text-body-lg font-display mb-4">
        Categorias mais buscadas
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-4">
        {CATEGORIES.map(({ label, slug, icon: Icon }) => (
          <li key={slug}>
            <Link
              to={`/cardapio?categoria=${slug}`}
              className="flex flex-col items-center gap-2 py-6 text-stone transition-colors duration-150 hover:text-ivory"
            >
              <Icon size={28} stroke={1.5} aria-hidden />
              <span className="text-body-sm font-body">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
