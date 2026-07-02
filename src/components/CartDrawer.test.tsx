import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider, useCart } from '@/context/CartContext';
import { CartDrawerProvider, useCartDrawer } from '@/context/CartDrawerContext';
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

function AddTrigger() {
  const { add } = useCart();
  const { notifyAdd } = useCartDrawer();
  return (
    <button
      type="button"
      onClick={() => {
        add(risoto);
        notifyAdd(risoto.name);
      }}
    >
      Adicionar Risoto
    </button>
  );
}

function CardapioPage() {
  return <AddTrigger />;
}

function CarrinhoPage() {
  return <h1>Carrinho</h1>;
}

function renderDrawer() {
  return render(
    <MemoryRouter initialEntries={['/cardapio']}>
      <CartProvider>
        <CartDrawerProvider>
          <Routes>
            <Route path="/cardapio" element={<CardapioPage />} />
            <Route path="/carrinho" element={<CarrinhoPage />} />
          </Routes>
          <CartDrawer />
        </CartDrawerProvider>
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('CartDrawer', () => {
  it('is closed by default', () => {
    renderDrawer();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens and shows the added item when notifyAdd is triggered', async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(screen.getByRole('button', { name: /adicionar risoto/i }));

    expect(
      screen.getByRole('dialog', { name: 'Carrinho' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Risoto de Funghi')).toBeInTheDocument();
  });

  it('closes when Escape is pressed and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    renderDrawer();
    const trigger = screen.getByRole('button', { name: /adicionar risoto/i });

    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it('closes when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(screen.getByRole('button', { name: /adicionar risoto/i }));
    await user.click(screen.getByTestId('cart-drawer-backdrop'));

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('moves focus to the close button on open', async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(screen.getByRole('button', { name: /adicionar risoto/i }));

    expect(
      screen.getByRole('button', { name: /fechar carrinho/i }),
    ).toHaveFocus();
  });

  it('"Ver carrinho completo" navigates to /carrinho and closes the drawer', async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(screen.getByRole('button', { name: /adicionar risoto/i }));
    await user.click(
      screen.getByRole('link', { name: /ver carrinho completo/i }),
    );

    expect(
      screen.getByRole('heading', { name: 'Carrinho' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
