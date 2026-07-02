import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Sidebar } from '@/components/Sidebar';
import { CartProvider, useCart } from '@/context/CartContext';
import type { MenuItem } from '@/types/menu';

const risoto: MenuItem = {
  id: '1',
  name: 'Risoto de Funghi',
  description: 'Risoto cremoso com mix de cogumelos.',
  price: 62.9,
  category: 'Principais',
  imageUrl: '',
  featured: false,
  popularity: 90,
};

function Seed() {
  const { add } = useCart();
  return (
    <button type="button" onClick={() => add(risoto, 3)}>
      seed
    </button>
  );
}

function renderSidebar() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Seed />
        <Sidebar />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('Sidebar', () => {
  it('shows no count badge when the cart is empty', () => {
    renderSidebar();

    expect(screen.getByRole('link', { name: 'Carrinho' })).toBeInTheDocument();
  });

  it('shows the item count and an updated label after items are added', async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(screen.getByText('seed'));

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Carrinho, 3 itens' }),
    ).toBeInTheDocument();
  });
});
