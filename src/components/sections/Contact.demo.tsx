import React from 'react';
import { Contact } from './Contact';
import { Profile } from '@/types';

/**
 * Demo file for the Contact component
 * This file demonstrates how to use the Contact component with sample data
 */

const sampleProfile: Profile = {
  name: 'Scott Ryan Howard',
  title: 'Software Engineer',
  summary: 'Experienced software engineer with a passion for building scalable web applications.',
  email: 'contact@scottryanhoward.info',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  profileImage: '/images/profile.jpg',
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/scottryanhoward',
      icon: 'linkedin',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/scottryanhoward',
      icon: 'github',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/scottryanhoward',
      icon: 'twitter',
    },
  ],
};

/**
 * Basic usage with default behavior
 */
export const BasicContactDemo = () => {
  return <Contact profile={sampleProfile} />;
};

/**
 * Usage with custom resume download handler
 */
export const ContactWithCustomHandlerDemo = () => {
  const handleDownloadResume = () => {
    console.log('Custom resume download handler called');
    // Custom logic here, e.g., analytics tracking
    window.open('/resume.pdf', '_blank');
  };

  return (
    <Contact profile={sampleProfile} onDownloadResume={handleDownloadResume} />
  );
};

/**
 * Usage with profile without phone number
 */
export const ContactWithoutPhoneDemo = () => {
  const profileWithoutPhone: Profile = {
    ...sampleProfile,
    phone: undefined,
  };

  return <Contact profile={profileWithoutPhone} />;
};

/**
 * Usage with minimal social links
 */
export const ContactMinimalSocialDemo = () => {
  const profileMinimalSocial: Profile = {
    ...sampleProfile,
    socialLinks: [
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/scottryanhoward',
        icon: 'linkedin',
      },
    ],
  };

  return <Contact profile={profileMinimalSocial} />;
};

/**
 * Full page example with multiple sections
 */
export const FullPageDemo = () => {
  return (
    <div>
      {/* Other sections would go here */}
      <Contact profile={sampleProfile} />
    </div>
  );
};

export default BasicContactDemo;
