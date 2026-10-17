import type {
  Profile,
  Experience,
  SkillCategory,
  Education,
  Certification,
  WorkProject,
  PersonalProject,
  Volunteering,
} from '@/types';

import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';
import educationData from '@/data/education.json';
import workProjectsData from '@/data/workProjects.json';
import personalProjectsData from '@/data/personalProjects.json';
import volunteeringData from '@/data/volunteering.json';

// Single entry point for site content. Components receive these values as props
// and never import from src/data directly. Shape is checked by content.test.ts.
export const profile = profileData as Profile;
export const experiences = experienceData as Experience[];
export const skillCategories = skillsData as SkillCategory[];
export const degrees = educationData.degrees as Education[];
export const certifications = educationData.certifications as Certification[];
export const workProjects = workProjectsData as WorkProject[];
export const personalProjects = personalProjectsData as PersonalProject[];
export const volunteering = volunteeringData as Volunteering[];
