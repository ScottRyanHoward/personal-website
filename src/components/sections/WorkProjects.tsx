import React, { useMemo } from 'react';
import { WorkProject, Experience } from '@/types';
import { ProjectCard } from '@/components/ui/ProjectCard';
import workProjectsData from '@/data/workProjects.json';
import experienceData from '@/data/experience.json';

export interface WorkProjectsProps {
  onViewExperience?: (experienceId: string) => void;
}

export const WorkProjects: React.FC<WorkProjectsProps> = ({ onViewExperience }) => {
  const workProjects = workProjectsData as WorkProject[];
  const experiences = experienceData as Experience[];

  // Create a map of experience IDs to company names for quick lookup
  const experienceMap = useMemo(() => {
    return experiences.reduce((acc, exp) => {
      acc[exp.id] = exp.company;
      return acc;
    }, {} as Record<string, string>);
  }, [experiences]);

  // Get company name for a project
  const getCompanyName = (project: WorkProject): string | undefined => {
    return experienceMap[project.experienceId];
  };

  return (
    <section
      id="work-projects"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="work-projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="work-projects-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Work Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Featured projects from my professional experience, showcasing solutions
            built for real-world business challenges.
          </p>
        </div>

        {/* Projects Grid */}
        {workProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {workProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                experienceCompany={getCompanyName(project)}
                onViewExperience={onViewExperience}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No work projects to display.</p>
          </div>
        )}
      </div>
    </section>
  );
};
