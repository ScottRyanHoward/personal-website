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

All content is stored in JSON files in the `src/data/` directory for easy updates:

- `profile.json` - Personal information and bio
- `experience.json` - Work history
- `skills.json` - Technical skills
- `workProjects.json` - Professional projects
- `personalProjects.json` - Personal/side projects
- `education.json` - Education and certifications

To update content:
1. Edit the relevant JSON file
2. Commit and push changes
3. Vercel will automatically redeploy

## Deployment

This site is configured for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Local production build testing
- Vercel setup and configuration
- Custom domain configuration for scottryanhoward.info
- Environment variables setup
- Post-deployment verification
- Monitoring and maintenance

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

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

The project includes comprehensive tests:

- Unit tests for components
- Integration tests for page navigation
- Accessibility tests with axe-core
- Performance tests
- Responsive design tests

Run tests:
```bash
npm test
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Scott Ryan Howard
- Website: [scottryanhoward.info](https://scottryanhoward.info)
- Email: contact@scottryanhoward.info

---

Built with ❤️ using Next.js and TypeScript
