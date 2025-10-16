'use client';

import React from 'react';
import { Button, OptimizedImage } from '@/components/ui';
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
      window.open('/Scott_Howard_Resume.pdf', '_blank');
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
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-4 py-20 pt-24 md:pt-28"
      aria-label="Hero section"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="relative mb-6 sm:mb-8 h-40 w-40 sm:h-48 sm:w-48 overflow-hidden rounded-full border-4 border-blue-300 shadow-2xl md:h-64 md:w-64 transition-transform hover:scale-105">
            <OptimizedImage
              src={profile.profileImage}
              alt={`${profile.name} profile picture`}
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 256px"
              fallbackSrc="/images/profile-placeholder.svg"
            />
          </div>

          {/* Name and Title */}
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold text-white md:text-5xl lg:text-6xl px-4">
            {profile.name}
          </h1>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-medium text-blue-100 md:text-3xl px-4">
            {profile.title}
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
            <Button
              variant="primary"
              onClick={handleViewWork}
              aria-label="View my work and projects"
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-500 focus:ring-white"
            >
              View Work
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadResume}
              aria-label="Download resume as PDF"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-900 focus:ring-white"
            >
              Download Resume
            </Button>
            <Button
              variant="secondary"
              onClick={handleContact}
              aria-label="Go to contact section"
              className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-600 focus:ring-white"
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
          className="h-8 w-8 text-blue-100"
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
