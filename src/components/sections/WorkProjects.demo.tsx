import React from 'react';
import { WorkProjects } from './WorkProjects';

/**
 * Demo component for WorkProjects section
 * 
 * This demonstrates the WorkProjects section with sample data from workProjects.json
 * 
 * Features demonstrated:
 * - Responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
 * - Project cards with images, descriptions, and technology tags
 * - Links to live demos and repositories
 * - Links to associated work experience
 * - Proper accessibility attributes
 */
export default function WorkProjectsDemo() {
  const handleViewExperience = (experienceId: string) => {
    console.log('Navigate to experience:', experienceId);
    // In a real application, this would scroll to or navigate to the experience section
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <WorkProjects onViewExperience={handleViewExperience} />
    </div>
  );
}
