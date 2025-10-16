import React from 'react';
import { Skills } from './Skills';
import { SkillCategory } from '@/types';

// Sample data for demonstration
const demoSkillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'JavaScript', category: 'Programming Languages', proficiency: 'expert', yearsOfExperience: 7 },
      { name: 'TypeScript', category: 'Programming Languages', proficiency: 'expert', yearsOfExperience: 5 },
      { name: 'Python', category: 'Programming Languages', proficiency: 'advanced', yearsOfExperience: 4 },
      { name: 'HTML5', category: 'Programming Languages', proficiency: 'expert', yearsOfExperience: 8 },
      { name: 'CSS3', category: 'Programming Languages', proficiency: 'expert', yearsOfExperience: 8 },
      { name: 'SQL', category: 'Programming Languages', proficiency: 'advanced', yearsOfExperience: 6 },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      { name: 'React', category: 'Frameworks & Libraries', proficiency: 'expert', yearsOfExperience: 6 },
      { name: 'Next.js', category: 'Frameworks & Libraries', proficiency: 'advanced', yearsOfExperience: 3 },
      { name: 'Node.js', category: 'Frameworks & Libraries', proficiency: 'expert', yearsOfExperience: 6 },
      { name: 'Express', category: 'Frameworks & Libraries', proficiency: 'advanced', yearsOfExperience: 5 },
      { name: 'Redux', category: 'Frameworks & Libraries', proficiency: 'advanced', yearsOfExperience: 4 },
      { name: 'Tailwind CSS', category: 'Frameworks & Libraries', proficiency: 'advanced', yearsOfExperience: 3 },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', category: 'Databases', proficiency: 'advanced', yearsOfExperience: 5 },
      { name: 'MongoDB', category: 'Databases', proficiency: 'advanced', yearsOfExperience: 4 },
      { name: 'Redis', category: 'Databases', proficiency: 'intermediate', yearsOfExperience: 3 },
      { name: 'MySQL', category: 'Databases', proficiency: 'advanced', yearsOfExperience: 5 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', category: 'Cloud & DevOps', proficiency: 'advanced', yearsOfExperience: 4 },
      { name: 'Docker', category: 'Cloud & DevOps', proficiency: 'advanced', yearsOfExperience: 4 },
      { name: 'Kubernetes', category: 'Cloud & DevOps', proficiency: 'intermediate', yearsOfExperience: 2 },
      { name: 'CI/CD', category: 'Cloud & DevOps', proficiency: 'advanced', yearsOfExperience: 5 },
      { name: 'GitHub Actions', category: 'Cloud & DevOps', proficiency: 'advanced', yearsOfExperience: 3 },
    ],
  },
];

/**
 * Demo component showing the Skills section with sample data
 */
export const SkillsDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Skills skillCategories={demoSkillCategories} />
    </div>
  );
};

export default SkillsDemo;
