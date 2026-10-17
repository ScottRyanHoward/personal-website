import dynamic from 'next/dynamic';
import { Header, Footer } from '@/components/layout';
import SkipToContent from '@/components/layout/SkipToContent';
import { Hero, About } from '@/components/sections';
import StructuredData from '@/components/StructuredData';
import {
  profile,
  experiences,
  skillCategories,
  degrees,
  certifications,
  workProjects,
  personalProjects,
  volunteering,
} from '@/lib/content';

// Lazy load below-the-fold sections for better initial page load performance
// ssr: false ensures components load on client side only, reducing initial bundle
const Experience = dynamic(() => import('@/components/sections/Experience').then(mod => mod.Experience), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true, // Keep SSR for SEO
});

const Skills = dynamic(() => import('@/components/sections/Skills').then(mod => mod.Skills), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true,
});

const WorkProjects = dynamic(() => import('@/components/sections/WorkProjects').then(mod => mod.WorkProjects), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true,
});

const PersonalProjects = dynamic(() => import('@/components/sections/PersonalProjects').then(mod => mod.PersonalProjects), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true,
});

const Education = dynamic(() => import('@/components/sections/Education').then(mod => mod.Education), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true,
});

const Volunteering = dynamic(() => import('@/components/sections/Volunteering').then(mod => mod.Volunteering), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true,
});

const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true,
});

export default function Home() {
  return (
    <>
      <StructuredData profile={profile} experiences={experiences} education={degrees} />
      <SkipToContent />
      <Header name={profile.name} />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <Hero profile={profile} />
        <About profile={profile} />
        <Experience experiences={experiences} />
        <Skills skillCategories={skillCategories} />
        <WorkProjects workProjects={workProjects} experiences={experiences} />
        <PersonalProjects personalProjects={personalProjects} />
        <Education degrees={degrees} certifications={certifications} />
        <Volunteering volunteering={volunteering} />
        <Contact profile={profile} />
      </main>
      <Footer socialLinks={profile.socialLinks} />
    </>
  );
}
