import { Spotlight } from '@/components/Spotlight';

const COLORS = [
  { name: 'basalt', hex: '#15140F' },
  { name: 'ivory', hex: '#F1ECDD' },
  { name: 'brass', hex: '#C49A4A' },
  { name: 'wine', hex: '#5B2430' },
  { name: 'stone', hex: '#8A8577' },
] as const;

const TYPE_SCALE = [
  { label: 'display-xl', className: 'text-display-xl font-display' },
  { label: 'display-lg', className: 'text-display-lg font-display' },
  { label: 'body-lg', className: 'text-body-lg font-body' },
  { label: 'body-md', className: 'text-body-md font-body' },
  { label: 'body-sm', className: 'text-body-sm font-body' },
  { label: 'mono-md', className: 'text-mono-md font-mono' },
] as const;

/**
 * Dev-only sanity check for the design-system tokens (colors, type scale,
 * spotlight element). Not part of the product — only mounted in dev builds.
 */
export default function DesignTokens() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <section>
        <h1 className="text-display-lg font-display mb-6">Design Tokens</h1>

        <h2 className="text-body-lg font-body mb-4 text-stone">Palette</h2>
        <ul className="grid grid-cols-5 gap-4">
          {COLORS.map((color) => (
            <li key={color.name} className="space-y-2">
              <div
                className="h-16 w-full rounded-sm"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-body-sm font-mono">
                {color.name}
                <br />
                {color.hex}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-body-lg font-body mb-4 text-stone">Typography</h2>
        <ul className="space-y-3">
          {TYPE_SCALE.map((row) => (
            <li key={row.label} className="flex items-baseline gap-4">
              <span className="text-body-sm font-mono w-24 shrink-0 text-stone">
                {row.label}
              </span>
              <span className={row.className}>Burrata com tomate confit</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-body-lg font-body mb-4 text-stone">Spotlight</h2>
        <div className="flex items-end gap-8">
          <div className="space-y-2 text-center">
            <Spotlight
              src="/placeholder-dish.svg"
              alt="Prato em destaque no hero"
              size="hero"
            />
            <p className="text-body-sm font-mono text-stone">hero (280px)</p>
          </div>
          <div className="space-y-2 text-center">
            <Spotlight
              src="/placeholder-dish.svg"
              alt="Prato em destaque na listagem"
              size="featured"
            />
            <p className="text-body-sm font-mono text-stone">
              featured (120px)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
