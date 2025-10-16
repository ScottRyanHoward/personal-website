# Personal Website - Scott Ryan Howard

A modern, performant personal website built with Next.js, TypeScript, and Tailwind CSS. This site serves as a digital resume showcasing professional experience, skills, projects, and contact information.

🌐 **Live Site**: [scottryanhoward.info](https://scottryanhoward.info)

## Features

- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- ⚡ **High Performance**: Lighthouse scores of 90+ across all metrics
- ♿ **Accessible**: WCAG 2.1 Level AA compliant
- 🎨 **Modern Design**: Clean, professional aesthetic with smooth animations
- 🔍 **SEO Optimized**: Meta tags, Open Graph, structured data, and sitemap
- 📊 **Analytics Ready**: Easy integration with analytics platforms
- 🚀 **Fast Loading**: Optimized images, code splitting, and caching strategies

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run analyze` - Analyze bundle size
- `npm run lighthouse` - Run Lighthouse audit

## Project Structure

```
├── public/              # Static assets
│   ├── images/         # Images and graphics
│   ├── resume.pdf      # Downloadable resume
│   ├── sitemap.xml     # SEO sitemap
│   └── robots.txt      # Search engine directives
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   │   ├── layout/    # Header, Footer, Navigation
│   │   ├── sections/  # Page sections (Hero, About, etc.)
│   │   └── ui/        # Reusable UI components
│   ├── data/          # Content data (JSON files)
│   ├── lib/           # Utility functions
│   ├── test/          # Test utilities and setup
│   └── types/         # TypeScript type definitions
├── .env.example       # Environment variables template
├── next.config.js     # Next.js configuration
├── vercel.json        # Vercel deployment configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## Content Management

All content is stored in JSON files in the `src/data/` directory for easy updates without touching code:

- `profile.json` - Personal information and bio
- `experience.json` - Work history
- `skills.json` - Technical skills
- `workProjects.json` - Professional projects
- `personalProjects.json` - Personal/side projects
- `education.json` - Education and certifications

### Updating Content

1. **Edit the relevant JSON file** in `src/data/`
2. **Test locally** with `npm run dev` to preview changes
3. **Commit and push** changes to your repository
4. **Automatic deployment** - Vercel will automatically rebuild and deploy

For detailed instructions on updating specific content types, see [CONTENT_GUIDE.md](./CONTENT_GUIDE.md).

### Adding New Projects

**Work Projects** (`src/data/workProjects.json`):
```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Brief description",
  "longDescription": "Detailed description with context and impact",
  "technologies": ["React", "Node.js", "AWS"],
  "companyId": "company-1",
  "experienceId": "exp-1",
  "images": ["/images/projects/project-name.jpg"],
  "demoUrl": "https://demo.example.com",
  "repoUrl": "https://github.com/username/repo",
  "featured": true,
  "startDate": "2023-01",
  "endDate": "2023-06"
}
```

**Personal Projects** (`src/data/personalProjects.json`):
```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Brief description",
  "longDescription": "Detailed description",
  "motivation": "Why you built this project",
  "technologies": ["TypeScript", "React"],
  "images": ["/images/projects/project-name.jpg"],
  "demoUrl": "https://demo.example.com",
  "repoUrl": "https://github.com/username/repo",
  "featured": true,
  "startDate": "2023-01",
  "endDate": "2023-06",
  "status": "completed"
}
```

### Adding New Experience

Edit `src/data/experience.json` and add a new entry:
```json
{
  "id": "unique-exp-id",
  "company": "Company Name",
  "companyLogo": "/images/companies/company-logo.png",
  "position": "Job Title",
  "location": "City, State",
  "startDate": "2023-01",
  "endDate": "Present",
  "description": "Brief role description",
  "responsibilities": [
    "Key responsibility 1",
    "Key responsibility 2"
  ],
  "achievements": [
    "Major achievement 1",
    "Major achievement 2"
  ],
  "technologies": ["React", "Node.js", "AWS"],
  "relatedProjects": ["work-proj-1", "work-proj-2"]
}
```

**Important**: When adding experience, ensure `relatedProjects` IDs match actual project IDs in `workProjects.json`.

## Deployment

This site is configured for deployment on Vercel with automatic deployments from Git.

### Initial Setup

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Custom Domain** (optional)
   - In Vercel project settings, go to "Domains"
   - Add `scottryanhoward.info`
   - Update DNS records as instructed by Vercel

### Continuous Deployment

Every push to the `main` branch triggers an automatic deployment:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests and other branches

### Local Production Build

Test the production build locally before deploying:
```bash
npm run build
npm start
```

Visit `http://localhost:3000` to verify the production build.

### Environment Variables

If you need environment variables (e.g., for analytics):
1. Create `.env.local` for local development (see `.env.local.example`)
2. Add variables in Vercel dashboard under "Settings" → "Environment Variables"

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

For more detailed deployment instructions, troubleshooting, and advanced configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Performance

The site is optimized for performance with:

- Next.js Image component for automatic image optimization
- Code splitting and lazy loading
- Efficient caching strategies
- Minimal JavaScript bundle size
- Font optimization with `font-display: swap`

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Accessibility

The site follows WCAG 2.1 Level AA guidelines:

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Focus indicators

## Testing

The project includes comprehensive test coverage:

### Unit & Integration Tests (Vitest)

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

Test coverage includes:
- Component rendering and behavior
- User interactions
- Accessibility (axe-core)
- Performance metrics
- Responsive design
- SEO metadata

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

E2E tests cover:
- Full page navigation flow
- Smooth scrolling between sections
- Mobile menu functionality
- External link behavior
- Resume download
- Cross-browser compatibility

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a personal website, but if you'd like to suggest improvements or report issues:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/improvement`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add some improvement'`)
5. **Push to the branch** (`git push origin feature/improvement`)
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Keep commits focused and write clear commit messages

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

**Images not loading:**
- Ensure images are in the `public/images/` directory
- Check that image paths in JSON files start with `/images/`
- Verify image file extensions match the references

**Tests failing:**
```bash
# Clear test cache
npm run test:run -- --clearCache
```

**Port 3000 already in use:**
```bash
# Use a different port
PORT=3001 npm run dev
```

For more help, check the [Next.js documentation](https://nextjs.org/docs) or open an issue.

## Documentation

- [Content Guide](./CONTENT_GUIDE.md) - Detailed guide for updating content
- [Deployment Guide](./DEPLOYMENT.md) - Step-by-step deployment instructions
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute to this project

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Scott Ryan Howard
- Website: [scottryanhoward.info](https://scottryanhoward.info)
- Email: contact@scottryanhoward.info

---

Built with ❤️ using Next.js and TypeScript
