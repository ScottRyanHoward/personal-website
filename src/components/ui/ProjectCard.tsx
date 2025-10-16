import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { OptimizedImage } from './OptimizedImage';
import { WorkProject } from '@/types';

export interface ProjectCardProps {
  project: WorkProject;
  experienceCompany?: string;
  onViewExperience?: (experienceId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  experienceCompany,
  onViewExperience,
}) => {
  const handleViewExperience = () => {
    if (onViewExperience && project.experienceId) {
      onViewExperience(project.experienceId);
    }
  };

  return (
    <Card variant="default" hoverable className="flex flex-col h-full">
      {/* Project Image */}
      {project.images && project.images.length > 0 && (
        <div className="relative w-full h-48 mb-4 -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 md:-mt-8 md:-mx-8 overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={project.images[0]}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fallbackSrc="/images/project-placeholder.svg"
          />
        </div>
      )}

      {/* Project Content */}
      <div className="flex-1 flex flex-col">
        {/* Title and Company */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {project.title}
          </h3>
          {experienceCompany && (
            <p className="text-sm text-gray-600">
              {experienceCompany}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 flex-1">
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`View live demo of ${project.title}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label={`View source code for ${project.title}`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Code
            </a>
          )}
          {onViewExperience && project.experienceId && (
            <button
              onClick={handleViewExperience}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`View experience at ${experienceCompany}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              View Experience
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};
