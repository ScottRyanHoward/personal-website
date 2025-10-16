import React from 'react';
import { Education as EducationType, Certification } from '@/types';

export interface EducationProps {
  degrees: EducationType[];
  certifications: Certification[];
}

const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const formatDateRange = (startDate: string, endDate: string): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const Education: React.FC<EducationProps> = ({ degrees, certifications }) => {
  // Sort degrees by end date (most recent first)
  const sortedDegrees = [...degrees].sort((a, b) => {
    const dateA = new Date(a.endDate);
    const dateB = new Date(b.endDate);
    return dateB.getTime() - dateA.getTime();
  });

  // Sort certifications by issue date (most recent first)
  const sortedCertifications = [...certifications].sort((a, b) => {
    const dateA = new Date(a.issueDate);
    const dateB = new Date(b.issueDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section
      id="education"
      className="bg-white px-4 py-20"
      aria-label="Education and certifications section"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Education & Certifications
        </h2>

        {/* Degrees Section */}
        {sortedDegrees.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Education</h3>
            <div className="space-y-6">
              {sortedDegrees.map((degree) => (
                <article
                  key={degree.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  aria-label={`${degree.degree} in ${degree.field} from ${degree.institution}`}
                >
                  <div className="flex gap-6">
                    {/* Institution Logo */}
                    {degree.institutionLogo && (
                      <div className="flex-shrink-0">
                        <img
                          src={degree.institutionLogo}
                          alt={`${degree.institution} logo`}
                          className="h-16 w-16 rounded-lg object-contain md:h-20 md:w-20"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      {/* Date range */}
                      <time className="mb-2 block text-sm font-semibold text-blue-600 md:text-base">
                        {formatDateRange(degree.startDate, degree.endDate)}
                      </time>

                      {/* Degree and field */}
                      <h4 className="mb-1 text-xl font-bold text-gray-900 md:text-2xl">
                        {degree.degree} in {degree.field}
                      </h4>

                      {/* Institution and location */}
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-base text-gray-700 md:text-lg">
                        <span className="font-medium">{degree.institution}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{degree.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* GPA */}
                  {degree.gpa && (
                    <p className="mb-3 text-sm font-medium text-gray-700">
                      GPA: {degree.gpa}
                    </p>
                  )}

                  {/* Description */}
                  {degree.description && (
                    <p className="mb-4 text-sm text-gray-700 md:text-base">
                      {degree.description}
                    </p>
                  )}

                  {/* Honors */}
                  {degree.honors && degree.honors.length > 0 && (
                    <div>
                      <h5 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                        Honors & Awards
                      </h5>
                      <ul className="space-y-1" role="list">
                        {degree.honors.map((honor, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2 text-sm text-gray-700 md:text-base"
                          >
                            <span className="mt-1 text-yellow-600">★</span>
                            <span>{honor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {sortedCertifications.length > 0 && (
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Certifications</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {sortedCertifications.map((cert) => (
                <article
                  key={cert.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  aria-label={`${cert.name} certification from ${cert.issuer}`}
                >
                  {/* Certification name */}
                  <h4 className="mb-2 text-lg font-bold text-gray-900 md:text-xl">
                    {cert.name}
                  </h4>

                  {/* Issuer */}
                  <p className="mb-3 text-base font-medium text-gray-700">
                    {cert.issuer}
                  </p>

                  {/* Issue date */}
                  <div className="mb-3 text-sm text-gray-600">
                    <time>
                      Issued: {formatDate(cert.issueDate)}
                    </time>
                    {cert.expiryDate && (
                      <>
                        <br />
                        <time>
                          Expires: {formatDate(cert.expiryDate)}
                        </time>
                      </>
                    )}
                  </div>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <p className="mb-3 text-xs text-gray-500">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}

                  {/* Credential link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`View ${cert.name} credential`}
                    >
                      <span>View Credential</span>
                      <svg
                        className="h-4 w-4"
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
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

Education.displayName = 'Education';
