type SpotlightSize = 'hero' | 'featured';

interface SpotlightProps {
  src: string;
  alt: string;
  /** 'hero' ~280px (page hero), 'featured' ~120px (one highlighted item per category). */
  size?: SpotlightSize;
  /** Skip the entrance animation — also honored automatically via prefers-reduced-motion. */
  disableAnimation?: boolean;
  className?: string;
}

const SIZE_PX: Record<SpotlightSize, number> = {
  hero: 280,
  featured: 120,
};

export function Spotlight({
  src,
  alt,
  size = 'featured',
  disableAnimation = false,
  className = '',
}: SpotlightProps) {
  const dimension = SIZE_PX[size];

  return (
    <div
      data-testid="spotlight"
      className={`relative overflow-hidden rounded-full ${disableAnimation ? '' : 'animate-spotlight-in'} ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: 'inset 0 0 40px 20px var(--color-basalt)' }}
      />
    </div>
  );
}
