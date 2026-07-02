import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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

function setup() {
  return renderHook(() => useCart(), { wrapper: CartProvider });
}

describe('CartContext', () => {
  it('sums quantity when the same item is added twice', () => {
    const { result } = setup();

    act(() => result.current.add(risoto));
    act(() => result.current.add(risoto, 2));

    expect(result.current.items).toEqual([
      expect.objectContaining({ id: '1', quantity: 3 }),
    ]);
  });

  it('updateQuantity sets an absolute value and removes the item at zero or below', () => {
    const { result } = setup();
    act(() => result.current.add(risoto));

    act(() => result.current.updateQuantity('1', 5));
    expect(result.current.items[0].quantity).toBe(5);

    act(() => result.current.updateQuantity('1', 0));
    expect(result.current.items).toHaveLength(0);
  });

  it('removeItem removes the item regardless of its current quantity', () => {
    const { result } = setup();
    act(() => result.current.add(risoto, 4));

    act(() => result.current.removeItem('1'));
    expect(result.current.items).toHaveLength(0);
  });

  it('clear empties the cart', () => {
    const { result } = setup();
    act(() => {
      result.current.add(risoto);
      result.current.add(frango);
    });

    act(() => result.current.clear());
    expect(result.current.items).toHaveLength(0);
  });

  it('recalculates the total after a quantity change', () => {
    const { result } = setup();
    act(() => result.current.add(risoto, 2));
    expect(result.current.total).toBeCloseTo(125.8);

    act(() => result.current.updateQuantity('1', 3));
    expect(result.current.total).toBeCloseTo(188.7);
  });

  it('itemCount sums quantities across every item', () => {
    const { result } = setup();
    act(() => {
      result.current.add(risoto, 2);
      result.current.add(frango, 3);
    });

    expect(result.current.itemCount).toBe(5);
  });
});
