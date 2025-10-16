// Profile and Social Links
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone?: string;
  location: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

// Work Experience
export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  relatedProjects: string[]; // Project IDs
}

// Projects
export interface WorkProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  companyId: string; // Links to experience
  experienceId: string; // Links to specific role
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
}

export interface PersonalProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  motivation: string; // Why this project was created
  technologies: string[];
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'archived';
}

// Skills
export interface Skill {
  name: string;
  category: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

// Education
export interface Education {
  id: string;
  institution: string;
  institutionLogo?: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}
