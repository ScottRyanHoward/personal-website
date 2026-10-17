import { describe, it, expect, afterEach } from 'vitest';
import { formatMonthYear, formatDateRange } from './dates';

describe('formatMonthYear', () => {
  it('formats YYYY-MM as short month and year', () => {
    expect(formatMonthYear('2023-01')).toBe('Jan 2023');
    expect(formatMonthYear('2019-12')).toBe('Dec 2019');
  });

  it('returns Present unchanged', () => {
    expect(formatMonthYear('Present')).toBe('Present');
  });
});

describe('formatDateRange', () => {
  it('formats a closed range', () => {
    expect(formatDateRange('2022-06', '2023-01')).toBe('Jun 2022 - Jan 2023');
  });

  it('formats an explicit Present end date', () => {
    expect(formatDateRange('2023-02', 'Present')).toBe('Feb 2023 - Present');
  });

  it('shows Present for a missing end date by default', () => {
    expect(formatDateRange('2023-11')).toBe('Nov 2023 - Present');
  });

  it('shows only the start date for a missing end date when openEnded is omit', () => {
    expect(formatDateRange('2025-05', undefined, { openEnded: 'omit' })).toBe('May 2025');
  });

  it('ignores openEnded when an end date is given', () => {
    expect(formatDateRange('2025-02', '2025-06', { openEnded: 'omit' })).toBe('Feb 2025 - Jun 2025');
  });
});

describe('timezone independence', () => {
  const originalTZ = process.env.TZ;

  afterEach(() => {
    process.env.TZ = originalTZ;
  });

  // "new Date('2023-01')" parses as UTC midnight and shows "Dec 2022" west of UTC.
  // The helper must give the same month everywhere.
  it.each(['UTC', 'America/New_York', 'America/Los_Angeles', 'Asia/Tokyo'])(
    'formats the same month in %s',
    (tz) => {
      process.env.TZ = tz;
      expect(formatMonthYear('2023-01')).toBe('Jan 2023');
      expect(formatDateRange('2022-06', '2023-01')).toBe('Jun 2022 - Jan 2023');
    }
  );
});
