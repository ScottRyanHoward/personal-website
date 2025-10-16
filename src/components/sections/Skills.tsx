import React from 'react';
import { SkillCategory } from '@/types';
import { SkillBadge } from '@/components/ui';

export interface SkillsProps {
  skillCategories: SkillCategory[];
  className?: string;
}

export const Skills: React.FC<SkillsProps> = ({ skillCategories, className = '' }) => {
  return (
    <section
      id="skills"
      className={`py-16 px-4 md:px-8 lg:px-16 ${className}`}
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="skills-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Skills & Technologies
        </h2>

        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {category.name}
              </h3>
              
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={`${category.name} skills`}
              >
                {category.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    category={category.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Skills.displayName = 'Skills';
