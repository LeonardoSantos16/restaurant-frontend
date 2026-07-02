import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { MenuItemRow } from '@/components/MenuItemRow';
import { CartProvider, useCart } from '@/context/CartContext';
import type { MenuItem } from '@/types/menu';

const baseItem: MenuItem = {
  id: '1',
  name: 'Risoto de Funghi',
  description: 'Risoto cremoso com mix de cogumelos.',
  price: 62.9,
  category: 'Principais',
  imageUrl: '',
  featured: false,
  popularity: 90,
  tags: ['vegetariano', 'sem-gluten'],
};

function CartCount() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return <span data-testid="cart-count">{count}</span>;
}

function renderRow(item: MenuItem) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <MenuItemRow item={item} />
        <CartCount />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('MenuItemRow', () => {
  it('renders dietary tags and the "mais pedido" badge', () => {
    renderRow(baseItem);

    expect(screen.getByText('mais pedido')).toBeInTheDocument();
    expect(screen.getByText('vegetariano')).toBeInTheDocument();
    expect(screen.getByText('sem glúten')).toBeInTheDocument();
  });

  it('adds the item to the cart when the add control is clicked', async () => {
    const user = userEvent.setup();
    renderRow(baseItem);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    await user.click(
      screen.getByRole('button', { name: /adicionar risoto de funghi/i }),
    );
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  it('renders a sold-out item as non-interactive with no add control', () => {
    renderRow({ ...baseItem, available: false });

    expect(screen.getByText('esgotado')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
