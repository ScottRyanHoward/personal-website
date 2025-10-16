import { Header, Footer } from '@/components/layout';
import SkipToContent from '@/components/layout/SkipToContent';
import {
  Hero,
  About,
  Experience,
  Skills,
  WorkProjects,
  PersonalProjects,
  Education,
  Contact,
} from '@/components/sections';
import StructuredData from '@/components/StructuredData';
import type {
  Profile,
  Experience as ExperienceType,
  SkillCategory,
  Education as EducationType,
  Certification,
} from '@/types';

// Import data
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';
import educationData from '@/data/education.json';

export default function Home() {
  return (
    <>
      <StructuredData 
        profile={profileData as Profile}
        experiences={experienceData as ExperienceType[]}
        education={educationData.degrees as EducationType[]}
      />
      <SkipToContent />
      <Header name={profileData.name} />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <Hero profile={profileData as Profile} />
        <About profile={profileData as Profile} />
        <Experience experiences={experienceData as ExperienceType[]} />
        <Skills skillCategories={skillsData as SkillCategory[]} />
        <WorkProjects />
        <PersonalProjects />
        <Education 
          degrees={educationData.degrees as EducationType[]} 
          certifications={educationData.certifications as Certification[]} 
        />
        <Contact profile={profileData as Profile} />
      </main>
      <Footer socialLinks={profileData.socialLinks} />
    </>
  );
}
