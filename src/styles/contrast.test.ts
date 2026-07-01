import { describe, expect, it } from 'vitest';

// Mirrors the color tokens defined in globals.css / DESIGN.md. If these values
// change, update both places and re-validate the contrast ratios below.
const TOKENS = {
  basalt: '#15140f',
  ivory: '#f1ecdd',
  brass: '#c49a4a',
} as const;

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const [rl, gl, bl] = [r, g, b].map(srgbToLinear);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexA);
  const lumB = relativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('design token contrast', () => {
  it('keeps ivory on basalt at WCAG AAA (>= 7:1) for body text', () => {
    expect(contrastRatio(TOKENS.ivory, TOKENS.basalt)).toBeGreaterThanOrEqual(
      7,
    );
  });

  it('keeps brass on basalt at WCAG AA (>= 4.5:1) for large text/UI', () => {
    expect(contrastRatio(TOKENS.brass, TOKENS.basalt)).toBeGreaterThanOrEqual(
      4.5,
    );
  });
});
