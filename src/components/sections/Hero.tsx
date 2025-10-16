import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { Profile } from '@/types';

export interface HeroProps {
  profile: Profile;
  onViewWork?: () => void;
  onDownloadResume?: () => void;
  onContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onViewWork,
  onDownloadResume,
  onContact,
}) => {
  const handleViewWork = () => {
    if (onViewWork) {
      onViewWork();
    } else {
      const workSection = document.getElementById('work-projects');
      workSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    if (onDownloadResume) {
      onDownloadResume();
    } else {
      window.open('/resume.pdf', '_blank');
    }
  };

  const handleContact = () => {
    if (onContact) {
      onContact();
    } else {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-20"
      aria-label="Hero section"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="relative mb-8 h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl md:h-64 md:w-64">
            <Image
              src={profile.profileImage}
              alt={`${profile.name} profile picture`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>

          {/* Name and Title */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <h2 className="mb-6 text-2xl font-medium text-gray-700 md:text-3xl">
            {profile.title}
          </h2>

          {/* Tagline/Summary */}
          <p className="mb-10 max-w-2xl text-lg text-gray-600 md:text-xl">
            {profile.summary}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              variant="primary"
              onClick={handleViewWork}
              aria-label="View my work and projects"
            >
              View Work
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadResume}
              aria-label="Download resume as PDF"
            >
              Download Resume
            </Button>
            <Button
              variant="secondary"
              onClick={handleContact}
              aria-label="Go to contact section"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Scroll down to next section"
      >
        <svg
          className="h-8 w-8 text-gray-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>
    </section>
  );
};
