// Minimal types for jest-axe, which ships none. @types/jest-axe is not used because it
// depends on @types/jest (whose globals clash with Vitest's) and on axe-core 3.x.
declare module 'jest-axe' {
  import type { AxeResults, RunOptions, Spec } from 'axe-core';

  export interface JestAxeConfigureOptions extends RunOptions {
    globalOptions?: Spec;
    impactLevels?: Array<'minor' | 'moderate' | 'serious' | 'critical'>;
  }

  export type JestAxe = (html: Element | string, options?: RunOptions) => Promise<AxeResults>;

  export const axe: JestAxe;
  export function configureAxe(options?: JestAxeConfigureOptions): JestAxe;
  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): { pass: boolean; message(): string; actual: unknown };
  };
}
