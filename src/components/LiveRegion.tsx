import { useCartDrawer } from '@/context/CartDrawerContext';

/**
 * Visually hidden announcer for screen readers. Lives outside `CartDrawer`
 * so the announcement still fires even if the drawer has already auto-closed.
 */
export function LiveRegion() {
  const { announcement } = useCartDrawer();

  return (
    <div aria-live="polite" className="sr-only">
      {announcement}
    </div>
  );
}
