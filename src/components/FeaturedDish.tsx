import { Link } from 'react-router';
import { Spotlight } from '@/components/Spotlight';
import type { MenuItem } from '@/types/menu';

interface FeaturedDishProps {
  dish: MenuItem;
}

export function FeaturedDish({ dish }: FeaturedDishProps) {
  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <Spotlight src={dish.imageUrl} alt={dish.name} size="hero" />
      <div className="space-y-2">
        <h2 className="text-display-lg font-display text-balance italic">
          {dish.name}
        </h2>
        <p className="text-body-md font-body text-stone max-w-md text-pretty">
          {dish.description}
        </p>
      </div>
      <Link
        to="/cardapio"
        className="text-body-md font-body text-brass underline-offset-4 transition-[text-decoration-color] duration-150 hover:underline"
      >
        Ver cardápio completo
      </Link>
    </section>
  );
}
