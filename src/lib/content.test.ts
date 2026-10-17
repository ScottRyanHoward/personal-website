import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';
import {
  profile,
  experiences,
  skillCategories,
  degrees,
  certifications,
  workProjects,
  personalProjects,
  volunteering,
} from './content';

// Validates every src/data/*.json file against the rules the components rely on.
// Each check collects all problems so one run reports every mistake, formatted as
// "<file> [<id>] <field>: <problem>".

type Entry = Record<string, unknown>;

const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;
const PROJECT_STATUSES = ['ideation', 'in-progress', 'completed'];
const PROFICIENCIES = ['beginner', 'intermediate', 'advanced', 'expert'];

const label = (file: string, entry: Entry, index: number) =>
  `${file} [${typeof entry.id === 'string' ? entry.id : `#${index}`}]`;

function checkRequired(
  file: string,
  entries: Entry[],
  fields: string[],
  { allowEmpty = [] }: { allowEmpty?: string[] } = {}
): string[] {
  const issues: string[] = [];
  entries.forEach((entry, i) => {
    for (const field of fields) {
      const value = entry[field];
      if (value === undefined || value === null) {
        issues.push(`${label(file, entry, i)} ${field}: missing`);
      } else if (typeof value === 'string' && value.trim() === '' && !allowEmpty.includes(field)) {
        issues.push(`${label(file, entry, i)} ${field}: empty`);
      }
    }
  });
  return issues;
}

function checkDates(
  file: string,
  entries: Entry[],
  fields: string[],
  { allowPresent }: { allowPresent: boolean }
): string[] {
  const issues: string[] = [];
  entries.forEach((entry, i) => {
    for (const field of fields) {
      const value = entry[field];
      if (value === undefined) continue;
      if (allowPresent && value === 'Present') continue;
      if (typeof value !== 'string' || !DATE_PATTERN.test(value)) {
        issues.push(
          `${label(file, entry, i)} ${field}: "${String(value)}" is not YYYY-MM${allowPresent ? ' or "Present"' : ''}`
        );
      }
    }
    const [start, end] = [entry.startDate, entry.endDate];
    if (
      typeof start === 'string' && DATE_PATTERN.test(start) &&
      typeof end === 'string' && DATE_PATTERN.test(end) &&
      start > end
    ) {
      issues.push(`${label(file, entry, i)} endDate: "${end}" is before startDate "${start}"`);
    }
  });
  return issues;
}

function checkUniqueIds(file: string, entries: Entry[]): string[] {
  const seen = new Set<string>();
  const issues: string[] = [];
  entries.forEach((entry, i) => {
    const id = entry.id as string;
    if (seen.has(id)) issues.push(`${label(file, entry, i)} id: duplicate`);
    seen.add(id);
  });
  return issues;
}

function checkAllowed(file: string, entries: Entry[], field: string, allowed: string[]): string[] {
  return entries.flatMap((entry, i) =>
    entry[field] !== undefined && !allowed.includes(entry[field] as string)
      ? [`${label(file, entry, i)} ${field}: "${String(entry[field])}" is not one of ${allowed.join(', ')}`]
      : []
  );
}

function checkImages(file: string, entries: Entry[], fields: string[]): string[] {
  const issues: string[] = [];
  entries.forEach((entry, i) => {
    for (const field of fields) {
      const value = entry[field];
      const paths = Array.isArray(value) ? value : value === undefined ? [] : [value];
      for (const path of paths) {
        if (typeof path !== 'string' || !existsSync(join(process.cwd(), 'public', path))) {
          issues.push(`${label(file, entry, i)} ${field}: "${String(path)}" not found under public/`);
        }
      }
    }
  });
  return issues;
}

const asEntries = (items: object[]) => items as unknown as Entry[];

describe('content: profile.json', () => {
  const file = 'profile.json';
  const entry = profile as unknown as Entry;

  it('has all required fields', () => {
    expect(
      checkRequired(file, [entry], ['name', 'title', 'summary', 'email', 'location', 'profileImage', 'socialLinks'])
    ).toEqual([]);
    expect(checkRequired(`${file} socialLinks`, asEntries(profile.socialLinks), ['platform', 'url', 'icon'])).toEqual([]);
  });

  it('references images that exist', () => {
    expect(checkImages(file, [entry], ['profileImage'])).toEqual([]);
  });
});

describe('content: experience.json', () => {
  const file = 'experience.json';
  const entries = asEntries(experiences);

  it('has all required fields', () => {
    expect(
      checkRequired(file, entries, [
        'id', 'company', 'position', 'location', 'startDate', 'endDate', 'description',
        'responsibilities', 'achievements', 'technologies', 'relatedProjects',
      ], { allowEmpty: ['description'] }) // a new role may be listed before its summary is written
    ).toEqual([]);
  });

  it('has valid dates', () => {
    expect(checkDates(file, entries, ['startDate', 'endDate'], { allowPresent: true })).toEqual([]);
  });

  it('has unique ids', () => {
    expect(checkUniqueIds(file, entries)).toEqual([]);
  });

  it('links relatedProjects to existing work projects', () => {
    const projectIds = new Set(workProjects.map((p) => p.id));
    const issues = experiences.flatMap((exp) =>
      exp.relatedProjects
        .filter((id) => !projectIds.has(id))
        .map((id) => `${file} [${exp.id}] relatedProjects: "${id}" not found in workProjects.json`)
    );
    expect(issues).toEqual([]);
  });

  it('references images that exist', () => {
    expect(checkImages(file, entries, ['companyLogo'])).toEqual([]);
  });
});

describe('content: skills.json', () => {
  const file = 'skills.json';

  it('has all required fields', () => {
    expect(checkRequired(file, asEntries(skillCategories), ['name', 'skills'])).toEqual([]);
    const skills = skillCategories.flatMap((c) => c.skills);
    expect(checkRequired(file, asEntries(skills), ['name', 'category'])).toEqual([]);
  });

  it('uses allowed proficiency values', () => {
    const skills = skillCategories.flatMap((c) => c.skills);
    expect(checkAllowed(file, asEntries(skills), 'proficiency', PROFICIENCIES)).toEqual([]);
  });
});

describe('content: education.json', () => {
  const file = 'education.json';

  it('has all required fields', () => {
    expect(
      checkRequired(`${file} degrees`, asEntries(degrees), [
        'id', 'institution', 'degree', 'field', 'location', 'startDate', 'endDate',
      ])
    ).toEqual([]);
    expect(
      checkRequired(`${file} certifications`, asEntries(certifications), ['id', 'name', 'issuer', 'issueDate'])
    ).toEqual([]);
  });

  it('has valid dates', () => {
    expect(checkDates(`${file} degrees`, asEntries(degrees), ['startDate', 'endDate'], { allowPresent: false })).toEqual([]);
    expect(
      checkDates(`${file} certifications`, asEntries(certifications), ['issueDate', 'expiryDate'], { allowPresent: false })
    ).toEqual([]);
  });

  it('has unique ids', () => {
    expect(checkUniqueIds(`${file} degrees`, asEntries(degrees))).toEqual([]);
    expect(checkUniqueIds(`${file} certifications`, asEntries(certifications))).toEqual([]);
  });

  it('references images that exist', () => {
    expect(checkImages(`${file} degrees`, asEntries(degrees), ['institutionLogo'])).toEqual([]);
  });
});

describe('content: workProjects.json', () => {
  const file = 'workProjects.json';
  const entries = asEntries(workProjects);

  it('has all required fields', () => {
    expect(
      checkRequired(file, entries, [
        'id', 'title', 'description', 'longDescription', 'technologies', 'companyId',
        'experienceId', 'images', 'featured', 'startDate',
      ])
    ).toEqual([]);
  });

  it('has valid dates', () => {
    expect(checkDates(file, entries, ['startDate', 'endDate'], { allowPresent: false })).toEqual([]);
  });

  it('has unique ids', () => {
    expect(checkUniqueIds(file, entries)).toEqual([]);
  });

  it('links experienceId to an existing experience', () => {
    const experienceIds = new Set(experiences.map((e) => e.id));
    const issues = workProjects
      .filter((p) => !experienceIds.has(p.experienceId))
      .map((p) => `${file} [${p.id}] experienceId: "${p.experienceId}" not found in experience.json`);
    expect(issues).toEqual([]);
  });

  it('references images that exist', () => {
    expect(checkImages(file, entries, ['images'])).toEqual([]);
  });
});

describe('content: personalProjects.json', () => {
  const file = 'personalProjects.json';
  const entries = asEntries(personalProjects);

  it('has all required fields', () => {
    expect(
      checkRequired(file, entries, [
        'id', 'title', 'description', 'longDescription', 'motivation', 'technologies',
        'images', 'featured', 'startDate', 'status',
      ])
    ).toEqual([]);
  });

  it('uses allowed status values', () => {
    expect(checkAllowed(file, entries, 'status', PROJECT_STATUSES)).toEqual([]);
  });

  it('has valid dates', () => {
    expect(checkDates(file, entries, ['startDate', 'endDate'], { allowPresent: false })).toEqual([]);
  });

  it('has unique ids', () => {
    expect(checkUniqueIds(file, entries)).toEqual([]);
  });

  it('references images that exist', () => {
    expect(checkImages(file, entries, ['images'])).toEqual([]);
  });
});

describe('content: volunteering.json', () => {
  const file = 'volunteering.json';
  const entries = asEntries(volunteering);

  it('has all required fields', () => {
    expect(checkRequired(file, entries, ['id', 'organization', 'role', 'startDate', 'description'])).toEqual([]);
  });

  it('has valid dates', () => {
    expect(checkDates(file, entries, ['startDate', 'endDate'], { allowPresent: true })).toEqual([]);
  });

  it('has unique ids', () => {
    expect(checkUniqueIds(file, entries)).toEqual([]);
  });

  it('references images that exist', () => {
    expect(checkImages(file, entries, ['organizationLogo'])).toEqual([]);
  });
});
