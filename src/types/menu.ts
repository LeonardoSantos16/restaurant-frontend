export type DietTag = 'vegetariano' | 'vegano' | 'sem-gluten' | 'picante';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  featured: boolean;
  popularity: number;
  /** Dietary/allergen tags shown as secondary metadata. Absent = none. */
  tags?: DietTag[];
  /** Absent or true = available; false = sold out ("esgotado"). */
  available?: boolean;
}
