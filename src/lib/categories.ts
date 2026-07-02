export interface Category {
  label: string;
  slug: string;
}

/** Canonical, ordered categories. Single source of truth for menu grouping. */
export const CATEGORIES: Category[] = [
  { label: 'Entradas', slug: 'entradas' },
  { label: 'Principais', slug: 'principais' },
  { label: 'Vinhos', slug: 'vinhos' },
  { label: 'Sobremesas', slug: 'sobremesas' },
];

/** Lowercase, accent-free slug. Resolves "Principais" (data) ↔ "principais" (link). */
export function slugify(label: string): string {
  return label.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Resolve a slug back to its canonical category label, if known. */
export function categoryFromSlug(slug: string): string | undefined {
  return CATEGORIES.find((category) => category.slug === slug)?.label;
}
