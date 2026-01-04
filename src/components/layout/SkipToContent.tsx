'use client';

import React from 'react';

/**
 * SkipToContent component provides a keyboard-accessible link
 * that allows users to skip navigation and jump directly to main content.
 * This is essential for screen reader users and keyboard navigation.
 */
const SkipToContent: React.FC = () => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 transition-all"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
