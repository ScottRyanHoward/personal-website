import React from 'react';
import { Education } from './Education';
import educationData from '@/data/education.json';

/**
 * Demo component for Education section
 * This demonstrates the Education component with real data
 */
export default function EducationDemo() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Education
        degrees={educationData.degrees}
        certifications={educationData.certifications}
      />
    </div>
  );
}
