import type { DietTag } from '@/types/menu';

/** Human-readable pt-BR label for each dietary/allergen tag. */
export const DIET_TAG_LABELS: Record<DietTag, string> = {
  vegetariano: 'vegetariano',
  vegano: 'vegano',
  'sem-gluten': 'sem glúten',
  picante: 'picante',
};
