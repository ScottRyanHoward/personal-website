import React from 'react';

/**
 * Pulsing block shown while a lazy-loaded page section's code is loading.
 * Decorative only, so it is hidden from assistive technology.
 */
export const SectionPlaceholder: React.FC = () => (
  <div aria-hidden="true" className="min-h-[400px] animate-pulse bg-gray-100" />
);
