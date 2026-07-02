import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QuantitySelector } from '@/components/QuantitySelector';

describe('QuantitySelector', () => {
  it('increments and decrements via onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /aumentar/i }));
    expect(onChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole('button', { name: /diminuir/i }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables the decrement control at the minimum', () => {
    render(<QuantitySelector value={1} onChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: /diminuir/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /aumentar/i })).toBeEnabled();
  });
});
