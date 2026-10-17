import dynamic from 'next/dynamic';
import { Header, Footer } from '@/components/layout';
import SkipToContent from '@/components/layout/SkipToContent';
import { Hero, About } from '@/components/sections';
import StructuredData from '@/components/StructuredData';
import { SectionPlaceholder } from '@/components/ui/SectionPlaceholder';
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

// Split below-the-fold sections into separate chunks. ssr: true keeps them in the
// server-rendered HTML for SEO; the placeholder only shows while a chunk loads.
const Experience = dynamic(() => import('@/components/sections/Experience').then(mod => mod.Experience), {
  loading: () => <SectionPlaceholder />,
  ssr: true, // Keep SSR for SEO
});

const Skills = dynamic(() => import('@/components/sections/Skills').then(mod => mod.Skills), {
  loading: () => <SectionPlaceholder />,
  ssr: true,
});

const WorkProjects = dynamic(() => import('@/components/sections/WorkProjects').then(mod => mod.WorkProjects), {
  loading: () => <SectionPlaceholder />,
  ssr: true,
});

const PersonalProjects = dynamic(() => import('@/components/sections/PersonalProjects').then(mod => mod.PersonalProjects), {
  loading: () => <SectionPlaceholder />,
  ssr: true,
});

const Education = dynamic(() => import('@/components/sections/Education').then(mod => mod.Education), {
  loading: () => <SectionPlaceholder />,
  ssr: true,
});

const Volunteering = dynamic(() => import('@/components/sections/Volunteering').then(mod => mod.Volunteering), {
  loading: () => <SectionPlaceholder />,
  ssr: true,
});

const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact), {
  loading: () => <SectionPlaceholder />,
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
