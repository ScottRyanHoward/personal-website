import React from 'react';
import { PersonalProjects } from './PersonalProjects';

/**
 * Demo component for PersonalProjects section
 * 
 * This component demonstrates the PersonalProjects section with sample data
 * from the personalProjects.json file.
 * 
 * Features demonstrated:
 * - Grid layout (1 column mobile, 2-3 columns desktop)
 * - Personal project cards with images, title, description, and motivation
 * - Status indicators (completed, in-progress, archived)
 * - Technology tags with purple styling
 * - Date/time period display
 * - Links to live demos and repositories
 * - Responsive design
 * - Accessibility features
 */
export const PersonalProjectsDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <PersonalProjects />
    </div>
  );
};

export default PersonalProjectsDemo;
