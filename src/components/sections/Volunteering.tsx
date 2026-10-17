import React from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { formatDateRange } from '@/lib/dates';
import { Volunteering as VolunteeringType } from '@/types';

export interface VolunteeringProps {
  volunteering: VolunteeringType[];
}

export const Volunteering: React.FC<VolunteeringProps> = ({ volunteering }) => {
  // Sort by start date (most recent first)
  const sortedVolunteering = [...volunteering].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section
      id="volunteering"
      className="bg-white px-4 py-20"
      aria-label="Volunteering section"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Volunteering
        </h2>

        {/* Volunteering Items */}
        <div className="space-y-6">
          {sortedVolunteering.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-shadow hover:shadow-md"
              aria-label={`${item.role} at ${item.organization}`}
            >
              <div className="flex gap-6">
                {/* Organization Logo (small, so served as-is without optimization or blur placeholder) */}
                {item.organizationLogo && (
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg md:h-20 md:w-20">
                    <OptimizedImage
                      src={item.organizationLogo}
                      alt={`${item.organization} logo`}
                      fill
                      className="object-contain"
                      unoptimized
                      placeholder="empty"
                      sizes="80px"
                    />
                  </div>
                )}

                <div className="flex-1">
                  {/* Date range */}
                  <time className="mb-2 block text-sm font-semibold text-primary-600 md:text-base">
                    {formatDateRange(item.startDate, item.endDate)}
                  </time>

                  {/* Role */}
                  <h3 className="mb-1 text-xl font-bold text-gray-900 md:text-2xl">
                    {item.role}
                  </h3>

                  {/* Organization and location */}
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-base text-gray-700 md:text-lg">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 transition-colors hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        {item.organization}
                      </a>
                    ) : (
                      <span className="font-medium">{item.organization}</span>
                    )}
                    {item.location && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{item.location}</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="mb-4 text-sm text-gray-700 md:text-base">
                      {item.description}
                    </p>
                  )}

                  {/* Achievements */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div>
                      <ul className="space-y-2" role="list">
                        {item.achievements.map((achievement, idx) => (
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

Volunteering.displayName = 'Volunteering';
