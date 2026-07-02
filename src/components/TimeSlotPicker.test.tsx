import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TimeSlotPicker } from '@/components/TimeSlotPicker';

const slots = ['19:00', '19:30', '20:00'];

describe('TimeSlotPicker', () => {
  it('renders every slot as a button', () => {
    render(<TimeSlotPicker slots={slots} value={null} onChange={vi.fn()} />);

    for (const slot of slots) {
      expect(screen.getByRole('button', { name: slot })).toBeInTheDocument();
    }
  });

  it('marks only the active slot as current', () => {
    render(<TimeSlotPicker slots={slots} value="19:30" onChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: '19:30' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: '19:00' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('calls onChange with the clicked slot', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimeSlotPicker slots={slots} value={null} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: '20:00' }));

    expect(onChange).toHaveBeenCalledWith('20:00');
  });
});
