import React from 'react';
import { Card } from './Card';
import { OptimizedImage } from './OptimizedImage';
import { PersonalProject } from '@/types';

export interface PersonalProjectCardProps {
  project: PersonalProject;
}

const statusConfig = {
  ideation: {
    label: 'Ideation',
    className: 'bg-pink-100 text-pink-800',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-yellow-100 text-yellow-800',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800',
  },
};

// Status normalization function for backward compatibility
const normalizeStatus = (status: string): 'ideation' | 'in-progress' | 'completed' => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case 'ideation':
      return 'ideation';
    case 'in-progress':
    case 'in progress':
      return 'in-progress';
    case 'completed':
    case 'archived': // Legacy support
      return 'completed';
    default:
      return 'completed'; // Default fallback
  }
};

const formatDateRange = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  if (!endDate) {
    return startFormatted;
  }

  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return `${startFormatted} - ${endFormatted}`;
};

export const PersonalProjectCard: React.FC<PersonalProjectCardProps> = ({
  project,
}) => {
  // Normalize status and provide default handling for missing or invalid values
  const normalizedStatus = normalizeStatus(project.status || 'completed');
  const statusInfo = statusConfig[normalizedStatus];

  return (
    <Card variant="default" className="flex flex-col h-full">
      {/* Project Image */}
      {project.images && project.images.length > 0 && (
        <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
          {project.images[0].endsWith('.svg') ? (
            <img
              src={project.images[0]}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <OptimizedImage
              src={project.images[0]}
              alt={`${project.title} screenshot`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
      )}

      {/* Project Content */}
      <div className="flex-1 flex flex-col">
        {/* Title and Status */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 flex-1">
              {project.title}
            </h3>
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusInfo.className}`}
              aria-label={`Project status: ${statusInfo.label}`}
            >
              {statusInfo.label}
            </span>
          </div>
          {/* Date Range */}
          <p className="text-sm text-gray-600">
            {formatDateRange(project.startDate, project.endDate)}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-3">
          {project.description}
        </p>

        {/* Motivation */}
        <div className="mb-4 p-3 bg-primary-50 rounded-lg border-l-4 border-primary-400">
          <p className="text-sm text-gray-700 italic">
            <span className="font-semibold text-gray-900 not-italic">Why: </span>
            {project.motivation}
          </p>
        </div>

        {/* Technology Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
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
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
        </div>
      </div>
    </Card>
  );
};
