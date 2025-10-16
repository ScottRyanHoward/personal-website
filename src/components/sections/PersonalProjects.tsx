import React from 'react';
import { PersonalProject } from '@/types';
import { PersonalProjectCard } from '@/components/ui/PersonalProjectCard';
import personalProjectsData from '@/data/personalProjects.json';

export const PersonalProjects: React.FC = () => {
  const personalProjects = personalProjectsData as PersonalProject[];

  return (
    <section
      id="personal-projects"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="personal-projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="personal-projects-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Personal Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Side projects and open-source contributions that showcase my passion
            for building tools and solving problems outside of work.
          </p>
        </div>

        {/* Projects Grid */}
        {personalProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {personalProjects.map((project) => (
              <PersonalProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No personal projects to display.</p>
          </div>
        )}
      </div>
    </section>
  );
};
