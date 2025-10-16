import React from 'react';
import { About } from './About';
import profileData from '@/data/profile.json';
import { Profile } from '@/types';

/**
 * Demo component showing the About section with real profile data
 */
export const AboutDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <About profile={profileData as Profile} />
    </div>
  );
};

export default AboutDemo;
