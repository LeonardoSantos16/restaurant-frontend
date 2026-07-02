import { useState } from 'react';
import { NavLink } from 'react-router';
import {
  IconHome,
  IconToolsKitchen2,
  IconShoppingBag,
  IconCalendarEvent,
  IconInfoCircle,
  type TablerIcon,
} from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';

interface NavItem {
  label: string;
  to: string;
  icon: TablerIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', to: '/', icon: IconHome },
  { label: 'Cardápio', to: '/cardapio', icon: IconToolsKitchen2 },
  { label: 'Carrinho', to: '/carrinho', icon: IconShoppingBag },
  { label: 'Reservas', to: '/reservas', icon: IconCalendarEvent },
  { label: 'Sobre', to: '/sobre', icon: IconInfoCircle },
];

export const SIDEBAR_COLLAPSED_WIDTH = 64;
export const SIDEBAR_EXPANDED_WIDTH = 180;

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const { itemCount } = useCart();

  return (
    <nav
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed inset-y-0 left-0 z-10 flex flex-col gap-1 overflow-hidden bg-basalt py-6 transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] print:hidden"
      style={{
        width: expanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
      }}
    >
      {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
        const isCart = to === '/carrinho';
        return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={
              isCart && itemCount > 0
                ? `${label}, ${itemCount} itens`
                : undefined
            }
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-body-sm font-body transition-colors duration-150 ${
                isActive
                  ? 'text-brass bg-brass/10'
                  : 'text-stone hover:text-ivory'
              }`
            }
          >
            <span className="relative shrink-0">
              <Icon size={22} stroke={1.5} aria-hidden />
              {isCart && itemCount > 0 && (
                <span
                  aria-hidden
                  className="absolute -top-2 -right-3 text-body-sm font-mono text-brass"
                >
                  {itemCount}
                </span>
              )}
            </span>
            <span
              className={`whitespace-nowrap transition-opacity duration-150 ${
                expanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
