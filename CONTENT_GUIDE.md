# Content Management Guide

This guide provides detailed instructions for updating content on your personal website. All content is stored in JSON files in the `src/data/` directory, making it easy to update without modifying code.

## Table of Contents

- [Overview](#overview)
- [Profile Information](#profile-information)
- [Work Experience](#work-experience)
- [Skills](#skills)
- [Work Projects](#work-projects)
- [Personal Projects](#personal-projects)
- [Education & Certifications](#education--certifications)
- [Images](#images)
- [Best Practices](#best-practices)

## Overview

### Content Files Location

All content files are located in `src/data/`:

```
src/data/
├── profile.json           # Personal info, bio, contact
├── experience.json        # Work history
├── skills.json           # Technical skills
├── workProjects.json     # Professional projects
├── personalProjects.json # Personal/side projects
└── education.json        # Education and certifications
```

### Workflow for Updating Content

1. **Edit** the relevant JSON file
2. **Test locally** with `npm run dev`
3. **Verify** changes at `http://localhost:3000`
4. **Commit** and push to your repository
5. **Deploy** automatically via Vercel

## Profile Information

**File**: `src/data/profile.json`

### Structure

```json
{
  "name": "Your Full Name",
  "title": "Your Professional Title",
  "tagline": "A brief, compelling tagline",
  "summary": "A 2-3 paragraph professional summary highlighting your expertise, experience, and what makes you unique.",
  "email": "your.email@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "City, State",
  "profileImage": "/images/profile.jpg",
  "resumeUrl": "/Scott_Howard_Resume.pdf",
  "socialLinks": [
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/yourprofile",
      "icon": "linkedin"
    },
    {
      "platform": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "github"
    },
    {
      "platform": "Twitter",
      "url": "https://twitter.com/yourhandle",
      "icon": "twitter"
    }
  ]
}
```

### Fields Explained

- **name**: Your full name as you want it displayed
- **title**: Your current professional title or role
- **tagline**: A short, memorable phrase (shown in Hero section)
- **summary**: Detailed professional summary (shown in About section)
- **email**: Your contact email
- **phone**: Optional phone number
- **location**: Your city and state/country
- **profileImage**: Path to your profile photo (must be in `public/images/`)
- **resumeUrl**: Path to your PDF resume (must be in `public/`)
- **socialLinks**: Array of social media profiles

### Supported Social Platforms

- LinkedIn
- GitHub
- Twitter
- GitLab
- Stack Overflow
- Medium
- Dev.to
- Personal Blog

## Work Experience

**File**: `src/data/experience.json`

### Structure

```json
[
  {
    "id": "exp-1",
    "company": "Company Name",
    "companyLogo": "/images/companies/company-logo.png",
    "position": "Senior Software Engineer",
    "location": "City, State",
    "startDate": "2020-01",
    "endDate": "Present",
    "description": "Brief 1-2 sentence overview of your role and the company.",
    "responsibilities": [
      "Led development of key features",
      "Mentored junior developers",
      "Architected scalable solutions"
    ],
    "achievements": [
      "Reduced load time by 40%",
      "Increased user engagement by 25%",
      "Successfully launched 3 major features"
    ],
    "technologies": ["React", "Node.js", "AWS", "PostgreSQL"],
    "relatedProjects": ["work-proj-1", "work-proj-2"]
  }
]
```

### Fields Explained

- **id**: Unique identifier (e.g., "exp-1", "exp-2")
- **company**: Company name
- **companyLogo**: Optional path to company logo
- **position**: Your job title
- **location**: Office location or "Remote"
- **startDate**: Format as "YYYY-MM" (e.g., "2020-01")
- **endDate**: Format as "YYYY-MM" or "Present"
- **description**: Brief role overview
- **responsibilities**: Array of key responsibilities
- **achievements**: Array of measurable accomplishments
- **technologies**: Array of technologies used
- **relatedProjects**: Array of project IDs from `workProjects.json`

### Tips

- List experiences in reverse chronological order (most recent first)
- Use action verbs for responsibilities (Led, Developed, Implemented)
- Quantify achievements with metrics when possible
- Keep descriptions concise but informative

## Skills

**File**: `src/data/skills.json`

### Structure

```json
{
  "categories": [
    {
      "name": "Programming Languages",
      "skills": [
        {
          "name": "JavaScript",
          "proficiency": "expert",
          "yearsOfExperience": 8
        },
        {
          "name": "TypeScript",
          "proficiency": "advanced",
          "yearsOfExperience": 5
        }
      ]
    },
    {
      "name": "Frameworks & Libraries",
      "skills": [
        {
          "name": "React",
          "proficiency": "expert",
          "yearsOfExperience": 6
        }
      ]
    }
  ]
}
```

### Proficiency Levels

- **beginner**: Learning or limited experience
- **intermediate**: Comfortable with fundamentals
- **advanced**: Deep knowledge and regular use
- **expert**: Mastery and teaching capability

### Suggested Categories

- Programming Languages
- Frameworks & Libraries
- Databases
- Cloud & DevOps
- Tools & Platforms
- Methodologies

### Tips

- Group related skills together
- Order categories by importance
- Be honest about proficiency levels
- Update years of experience regularly

## Work Projects

**File**: `src/data/workProjects.json`

### Structure

```json
[
  {
    "id": "work-proj-1",
    "title": "Enterprise Dashboard",
    "description": "Brief one-sentence description for cards",
    "longDescription": "Detailed 2-3 paragraph description explaining the project context, your role, challenges faced, and solutions implemented. Include the impact and results.",
    "technologies": ["React", "TypeScript", "AWS", "PostgreSQL"],
    "companyId": "company-1",
    "experienceId": "exp-1",
    "images": [
      "/images/projects/dashboard-1.jpg",
      "/images/projects/dashboard-2.jpg"
    ],
    "demoUrl": "https://demo.example.com",
    "repoUrl": "https://github.com/company/repo",
    "featured": true,
    "startDate": "2021-03",
    "endDate": "2021-08"
  }
]
```

### Fields Explained

- **id**: Unique identifier (e.g., "work-proj-1")
- **title**: Project name
- **description**: Short description for project cards
- **longDescription**: Detailed description with context and impact
- **technologies**: Array of technologies used
- **companyId**: ID of the company (for future use)
- **experienceId**: ID from `experience.json` this project relates to
- **images**: Array of image paths (first image is the thumbnail)
- **demoUrl**: Optional link to live demo
- **repoUrl**: Optional link to repository (if public)
- **featured**: Boolean - show in featured projects section
- **startDate**: Format as "YYYY-MM"
- **endDate**: Format as "YYYY-MM" or omit if ongoing

### Tips

- Link projects to relevant experience entries
- Use high-quality screenshots
- Highlight your specific contributions
- Include measurable results when possible
- Featured projects appear first

## Personal Projects

**File**: `src/data/personalProjects.json`

### Structure

```json
[
  {
    "id": "personal-proj-1",
    "title": "Open Source Library",
    "description": "Brief one-sentence description",
    "longDescription": "Detailed description of the project, what it does, and why you built it.",
    "motivation": "Explain why you created this project - what problem does it solve? What did you learn?",
    "technologies": ["TypeScript", "Node.js", "Jest"],
    "images": ["/images/projects/library-screenshot.jpg"],
    "demoUrl": "https://demo.example.com",
    "repoUrl": "https://github.com/yourusername/project",
    "featured": true,
    "startDate": "2022-01",
    "endDate": "2022-06",
    "status": "completed"
  }
]
```

### Status Values

- **completed**: Project is finished
- **in-progress**: Actively working on it
- **archived**: No longer maintained

### Tips

- Emphasize what you learned
- Explain your motivation clearly
- Link to GitHub repositories
- Include live demos when possible
- Showcase your passion and initiative

## Education & Certifications

**File**: `src/data/education.json`

### Structure

```json
{
  "education": [
    {
      "id": "edu-1",
      "institution": "University Name",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "location": "City, State",
      "startDate": "2012-09",
      "endDate": "2016-05",
      "gpa": "3.8",
      "honors": ["Cum Laude", "Dean's List"],
      "description": "Optional description of relevant coursework or achievements"
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "issueDate": "2021-06",
      "expiryDate": "2024-06",
      "credentialId": "ABC123XYZ",
      "credentialUrl": "https://aws.amazon.com/verification/ABC123XYZ"
    }
  ]
}
```

### Tips

- List education in reverse chronological order
- Include relevant honors and achievements
- Add certification expiry dates if applicable
- Link to credential verification when available

## Images

### Image Guidelines

**Profile Photo**:
- Location: `public/images/profile.jpg`
- Recommended size: 400x400px
- Format: JPG or PNG
- Professional headshot

**Company Logos**:
- Location: `public/images/companies/`
- Recommended size: 200x200px
- Format: PNG with transparency
- Square aspect ratio

**Project Screenshots**:
- Location: `public/images/projects/`
- Recommended size: 1200x800px (3:2 aspect ratio)
- Format: JPG or PNG
- Optimize for web (< 200KB per image)

### Adding Images

1. Place image files in the appropriate `public/images/` subdirectory
2. Reference them in JSON files with paths starting with `/images/`
3. Use descriptive filenames (e.g., `project-dashboard-main.jpg`)

### Image Optimization

```bash
# Install image optimization tool
npm install -g sharp-cli

# Optimize images
sharp -i input.jpg -o output.jpg --quality 85 --progressive
```

## Best Practices

### Content Writing

- **Be Concise**: Keep descriptions clear and to the point
- **Use Action Verbs**: Start bullet points with strong verbs
- **Quantify Results**: Include metrics and numbers when possible
- **Stay Current**: Update content regularly
- **Proofread**: Check for typos and grammatical errors

### JSON Formatting

- Use consistent indentation (2 spaces)
- Validate JSON syntax before committing
- Use double quotes for strings
- Keep arrays on multiple lines for readability

### Testing Changes

Always test locally before deploying:

```bash
# Start development server
npm run dev

# Run tests
npm run test:run

# Build for production
npm run build
```

### Version Control

```bash
# Create a feature branch for content updates
git checkout -b content/update-projects

# Commit with descriptive messages
git commit -m "Add new project: Enterprise Dashboard"

# Push and create PR
git push origin content/update-projects
```

## Troubleshooting

### Common Issues

**JSON Syntax Errors**:
- Use a JSON validator (e.g., jsonlint.com)
- Check for missing commas or quotes
- Ensure proper bracket matching

**Images Not Displaying**:
- Verify image path starts with `/images/`
- Check that file exists in `public/images/`
- Ensure file extension matches reference

**Content Not Updating**:
- Clear browser cache
- Rebuild the site: `npm run build`
- Check Vercel deployment logs

## Need Help?

- Check the [main README](./README.md) for general information
- Review [Next.js documentation](https://nextjs.org/docs)
- Open an issue on GitHub for bugs or questions

---

Last updated: October 2025
