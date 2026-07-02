import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { CartProvider, useCart } from '@/context/CartContext';
import Cart from '@/pages/Cart';
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

const frango: MenuItem = {
  id: '2',
  name: 'Frango à Parmegiana',
  description: 'Filé de frango empanado.',
  price: 54.9,
  category: 'Principais',
  imageUrl: '',
  featured: false,
  popularity: 76,
};

function Seed({ item, quantity = 1 }: { item: MenuItem; quantity?: number }) {
  const { add } = useCart();
  return (
    <button type="button" onClick={() => add(item, quantity)}>
      seed-{item.id}
    </button>
  );
}

function renderCart(seeds: Array<{ item: MenuItem; quantity?: number }> = []) {
  return render(
    <MemoryRouter>
      <CartProvider>
        {seeds.map(({ item, quantity }) => (
          <Seed key={item.id} item={item} quantity={quantity} />
        ))}
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  );
}

async function seedAll(user: ReturnType<typeof userEvent.setup>) {
  for (const button of screen.queryAllByText(/^seed-/)) {
    await user.click(button);
  }
}

describe('Cart page', () => {
  it('shows the empty state with a link back to the menu', () => {
    renderCart();

    expect(
      screen.getByText('Nenhum prato selecionado ainda.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver cardápio/i })).toHaveAttribute(
      'href',
      '/cardapio',
    );
  });

  it('lists items with name, quantity and line price', async () => {
    const user = userEvent.setup();
    renderCart([{ item: risoto, quantity: 2 }, { item: frango }]);
    await seedAll(user);

    expect(screen.getByText('Risoto de Funghi')).toBeInTheDocument();
    expect(screen.getByText('R$ 125,80')).toBeInTheDocument();
    expect(screen.getByText('R$ 54,90')).toBeInTheDocument();
    expect(screen.getByText('R$ 180,70')).toBeInTheDocument();
  });

  it('updates the total when a line item quantity changes', async () => {
    const user = userEvent.setup();
    renderCart([{ item: risoto }]);
    await seedAll(user);

    await user.click(screen.getByRole('button', { name: /aumentar/i }));

    expect(screen.getAllByText('R$ 125,80')).toHaveLength(2);
  });

  it('removes an item from the list', async () => {
    const user = userEvent.setup();
    renderCart([{ item: risoto }, { item: frango }]);
    await seedAll(user);

    await user.click(
      screen.getByRole('button', { name: /remover risoto de funghi/i }),
    );

    expect(screen.queryByText('Risoto de Funghi')).toBeNull();
    expect(screen.getByText('Frango à Parmegiana')).toBeInTheDocument();
  });

  it('empties the cart via "Esvaziar carrinho"', async () => {
    const user = userEvent.setup();
    renderCart([{ item: risoto }]);
    await seedAll(user);

    await user.click(
      screen.getByRole('button', { name: /esvaziar carrinho/i }),
    );

    expect(
      screen.getByText('Nenhum prato selecionado ainda.'),
    ).toBeInTheDocument();
  });

  it('points the primary action to reservations', async () => {
    const user = userEvent.setup();
    renderCart([{ item: risoto }]);
    await seedAll(user);

    expect(
      screen.getByRole('link', { name: /reservar uma mesa/i }),
    ).toHaveAttribute('href', '/reservas');
  });
});
