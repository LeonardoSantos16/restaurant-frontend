interface CategoryDividerProps {
  label: string;
}

export function CategoryDivider({ label }: CategoryDividerProps) {
  return (
    <h2 className="flex items-center gap-4 text-body-sm font-body uppercase tracking-wide text-stone">
      <span aria-hidden className="h-px flex-1 bg-stone/20" />
      {label}
      <span aria-hidden className="h-px flex-1 bg-stone/20" />
    </h2>
  );
}
