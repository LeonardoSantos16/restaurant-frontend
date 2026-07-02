import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CartProvider, useCart } from '@/context/CartContext';
import MenuItemDetail from '@/pages/MenuItemDetail';
import type { MenuItem } from '@/types/menu';

const picanha: MenuItem = {
  id: '1',
  name: 'Picanha na Brasa',
  description: 'Picanha grelhada na brasa com arroz, feijão e farofa.',
  price: 89.9,
  category: 'Principais',
  imageUrl: '',
  featured: true,
  popularity: 98,
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

const mockUseMenuItem = vi.fn();
const mockUseMenu = vi.fn();

vi.mock('@/hooks/useMenu', () => ({
  useMenuItem: (id: string) => mockUseMenuItem(id),
  useMenu: () => mockUseMenu(),
}));

function CartTotal() {
  const { total } = useCart();
  return <span data-testid="total">{total.toFixed(2)}</span>;
}

function renderDetail() {
  return render(
    <MemoryRouter initialEntries={['/cardapio/1']}>
      <CartProvider>
        <Routes>
          <Route path="/cardapio/:id" element={<MenuItemDetail />} />
        </Routes>
        <CartTotal />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('MenuItemDetail', () => {
  beforeEach(() => {
    mockUseMenuItem.mockReturnValue({
      data: picanha,
      isLoading: false,
      isError: false,
    });
    mockUseMenu.mockReturnValue({ data: [picanha, frango] });
  });

  it('renders the dish name, price and description', () => {
    renderDetail();

    expect(
      screen.getByRole('heading', { name: 'Picanha na Brasa' }),
    ).toBeInTheDocument();
    expect(screen.getByText('R$ 89,90')).toBeInTheDocument();
    expect(screen.getByText(/picanha grelhada na brasa/i)).toBeInTheDocument();
  });

  it('adds the chosen quantity to the cart', async () => {
    const user = userEvent.setup();
    renderDetail();

    await user.click(screen.getByRole('button', { name: /aumentar/i }));
    await user.click(
      screen.getByRole('button', { name: /adicionar ao carrinho/i }),
    );

    // 89.90 * 2
    expect(screen.getByTestId('total')).toHaveTextContent('179.80');
  });

  it('shows the sold-out state without a buy action', () => {
    mockUseMenuItem.mockReturnValue({
      data: { ...picanha, available: false },
      isLoading: false,
      isError: false,
    });
    renderDetail();

    expect(screen.getByText('esgotado')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /adicionar ao carrinho/i }),
    ).toBeNull();
  });

  it('shows a not-found state for an unknown item', () => {
    mockUseMenuItem.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    renderDetail();

    expect(screen.getByText('Prato não encontrado.')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /ver cardápio/i }),
    ).toBeInTheDocument();
  });

  it('lists other items from the same category', () => {
    renderDetail();

    expect(screen.getByText('Outros de Principais')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Frango à Parmegiana' }),
    ).toBeInTheDocument();
  });
});
