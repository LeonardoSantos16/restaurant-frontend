import { DIET_TAG_LABELS } from '@/lib/dietTags';
import { isPopular } from '@/lib/menu';
import type { MenuItem } from '@/types/menu';

interface DishMetaProps {
  item: MenuItem;
}

/** Secondary metadata line: "mais pedido" badge and dietary tags, all in stone. */
export function DishMeta({ item }: DishMetaProps) {
  const tags = item.tags ?? [];
  const popular = isPopular(item);

  if (!popular && tags.length === 0) return null;

  return (
    <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-body-sm font-body text-stone">
      {popular && <span>mais pedido</span>}
      {tags.map((tag) => (
        <span key={tag}>{DIET_TAG_LABELS[tag]}</span>
      ))}
    </p>
  );
}
