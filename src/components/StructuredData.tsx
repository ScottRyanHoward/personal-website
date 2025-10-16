import type { Profile, Experience, Education as EducationType } from '@/types';

interface StructuredDataProps {
  profile: Profile;
  experiences?: Experience[];
  education?: EducationType[];
}

export default function StructuredData({ profile, experiences = [], education = [] }: StructuredDataProps) {
  const siteUrl = "https://scottryanhoward.info";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    email: profile.email,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    image: `${siteUrl}${profile.profileImage}`,
    url: siteUrl,
    sameAs: profile.socialLinks.map(link => link.url),
    worksFor: experiences.length > 0 ? {
      "@type": "Organization",
      name: experiences[0].company,
    } : undefined,
    alumniOf: education.map(edu => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "Full Stack Development",
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
