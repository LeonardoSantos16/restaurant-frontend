interface TimeSlotPickerProps {
  slots: readonly string[];
  value: string | null;
  onChange: (time: string) => void;
}

function chipClass(isActive: boolean): string {
  return `text-body-sm font-mono transition-colors duration-150 ${
    isActive ? 'text-brass' : 'text-stone hover:text-ivory'
  }`;
}

/** Fixed time-slot chips for the reservation form. Local state only — does not touch the URL. */
export function TimeSlotPicker({
  slots,
  value,
  onChange,
}: TimeSlotPickerProps) {
  return (
    <div
      role="group"
      aria-label="Horário"
      className="flex flex-wrap gap-x-5 gap-y-2"
    >
      {slots.map((slot) => {
        const isActive = value === slot;
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onChange(slot)}
            className={chipClass(isActive)}
            aria-current={isActive ? 'true' : undefined}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
