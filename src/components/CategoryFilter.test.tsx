import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { CategoryFilter } from '@/components/CategoryFilter';

function renderFilter(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <CategoryFilter />
    </MemoryRouter>,
  );
}

describe('CategoryFilter', () => {
  it('marks "Tudo" active when no category param is set', () => {
    renderFilter('/cardapio');

    expect(screen.getByRole('link', { name: 'Tudo' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(
      screen.getByRole('link', { name: 'Principais' }),
    ).not.toHaveAttribute('aria-current');
  });

  it('marks the matching category active from the query param', () => {
    renderFilter('/cardapio?categoria=principais');

    expect(screen.getByRole('link', { name: 'Principais' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('link', { name: 'Tudo' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('links each chip to its category slug', () => {
    renderFilter('/cardapio');

    expect(screen.getByRole('link', { name: 'Vinhos' })).toHaveAttribute(
      'href',
      '/cardapio?categoria=vinhos',
    );
  });
});
