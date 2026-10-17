// Shared date formatting for content dates stored as "YYYY-MM" (or "Present").
// Year and month are parsed as numbers and built as a local date, so the output
// doesn't depend on the timezone the page is rendered in.

export type OpenEnded = 'present' | 'omit';

export const formatMonthYear = (value: string): string => {
  if (value === 'Present') return 'Present';

  const [year, month] = value.split('-').map(Number);
  return new Date(year, month - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateRange = (
  start: string,
  end?: string,
  { openEnded = 'present' }: { openEnded?: OpenEnded } = {}
): string => {
  const startFormatted = formatMonthYear(start);

  if (!end) {
    return openEnded === 'omit' ? startFormatted : `${startFormatted} - Present`;
  }

  return `${startFormatted} - ${formatMonthYear(end)}`;
};
