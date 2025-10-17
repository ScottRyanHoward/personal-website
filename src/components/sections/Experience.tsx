import React from 'react';
import { OptimizedImage } from '@/components/ui';
import { Experience as ExperienceType } from '@/types';

export interface ExperienceProps {
  experiences: ExperienceType[];
}

const formatDate = (dateString: string): string => {
  if (dateString === 'Present') return 'Present';
  
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const formatDateRange = (startDate: string, endDate: string | 'Present'): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.endDate === 'Present' ? new Date() : new Date(a.endDate);
    const dateB = b.endDate === 'Present' ? new Date() : new Date(b.endDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section
      id="experience"
      className="bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-20"
      aria-label="Work experience section"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Work Experience
        </h2>

        {/* Timeline */}
        <div className="relative">
          {sortedExperiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative flex gap-4 pb-12 md:gap-8"
              role="article"
              aria-label={`${exp.position} at ${exp.company}`}
            >
              {/* Timeline marker and line */}
              <div className="flex flex-col items-center">
                {/* Marker circle */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-lg md:h-14 md:w-14">
                  <div className="h-4 w-4 rounded-full bg-white md:h-5 md:w-5" />
                </div>
                {/* Connecting line */}
                {index < sortedExperiences.length - 1 && (
                  <div className="mt-2 w-1 flex-1 bg-gray-300" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                {/* Date range */}
                <time className="mb-2 block text-sm font-semibold text-blue-600 md:text-base">
                  {formatDateRange(exp.startDate, exp.endDate)}
                </time>

                {/* Company and position */}
                <div className="mb-4">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 md:text-2xl">
                    {exp.position}
                  </h3>
                  <div className="flex items-center gap-3">
                    {/* Company logo */}
                    {exp.companyLogo && (
                      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded bg-white shadow-sm">
                        <OptimizedImage
                          src={exp.companyLogo}
                          alt={`${exp.company} logo`}
                          fill
                          className="object-contain p-1"
                          sizes="32px"
                          fallbackSrc="/images/company-placeholder.svg"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium text-gray-700">
                        {exp.company}
                      </p>
                      <span className="text-gray-400">•</span>
                      <p className="text-sm text-gray-600">{exp.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-base text-gray-700 md:text-lg">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                {exp.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2" role="list">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-sm text-gray-700 md:text-base"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {exp.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2" role="list">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-sm text-gray-700 md:text-base"
                        >
                          <span className="mt-1 text-green-600">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Experience.displayName = 'Experience';
