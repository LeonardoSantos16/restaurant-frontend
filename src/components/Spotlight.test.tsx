import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spotlight } from '@/components/Spotlight';

describe('Spotlight', () => {
  it('plays the entrance animation by default', () => {
    render(<Spotlight src="/dish.jpg" alt="Prato assinatura" />);

    expect(screen.getByTestId('spotlight').className).toContain(
      'animate-spotlight-in',
    );
  });

  it('skips the entrance animation when disableAnimation is set', () => {
    render(
      <Spotlight src="/dish.jpg" alt="Prato assinatura" disableAnimation />,
    );

    expect(screen.getByTestId('spotlight').className).not.toContain(
      'animate-spotlight-in',
    );
  });
});
