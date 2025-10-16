import React from 'react';
import { Experience } from './Experience';
import experienceData from '@/data/experience.json';

/**
 * Demo component showing the Experience section with real data
 */
export default function ExperienceDemo() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Experience experiences={experienceData} />
    </div>
  );
}
