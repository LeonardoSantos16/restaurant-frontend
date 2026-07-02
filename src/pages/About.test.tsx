import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import About from '@/pages/About';

function renderAbout() {
  return render(
    <MemoryRouter initialEntries={['/sobre']}>
      <About />
    </MemoryRouter>,
  );
}

describe('About', () => {
  it('renders the positioning statement as the heading, not a generic label', () => {
    renderAbout();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/luz âmbar/i);
    expect(heading).not.toHaveTextContent(/^sobre$/i);
  });

  it('shows the practical information block', () => {
    renderAbout();

    expect(screen.getByText('Horários')).toBeInTheDocument();
    expect(screen.getByText('Endereço')).toBeInTheDocument();
    expect(screen.getByText('Reservas')).toBeInTheDocument();
  });

  it('ends with a reservation link to /reservas', () => {
    renderAbout();

    expect(
      screen.getByRole('link', { name: /reservar uma mesa/i }),
    ).toHaveAttribute('href', '/reservas');
  });
});
