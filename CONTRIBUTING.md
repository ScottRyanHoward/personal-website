# Contributing Guidelines

Thank you for your interest in contributing to this personal website project! While this is primarily a personal portfolio site, contributions in the form of bug fixes, improvements, and suggestions are welcome.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect everyone to:

- Be respectful and considerate
- Accept constructive criticism gracefully
- Focus on what is best for the project
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Any conduct that could be considered inappropriate in a professional setting

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

1. **Clear title**: Describe the bug concisely
2. **Description**: Explain what happened vs. what you expected
3. **Steps to reproduce**: Provide detailed steps
4. **Environment**: Browser, OS, device information
5. **Screenshots**: If applicable
6. **Error messages**: Include console errors

**Example**:
```markdown
**Bug**: Mobile menu doesn't close after clicking a link

**Expected**: Menu should close automatically after navigation

**Steps to Reproduce**:
1. Open site on mobile device
2. Click hamburger menu
3. Click any navigation link
4. Menu remains open

**Environment**: iOS 16, Safari
```

### Suggesting Enhancements

For feature requests or improvements:

1. **Check existing issues** to avoid duplicates
2. **Describe the enhancement** clearly
3. **Explain the use case** and benefits
4. **Provide examples** if possible

### Types of Contributions Welcome

- 🐛 Bug fixes
- 📝 Documentation improvements
- ♿ Accessibility enhancements
- 🎨 UI/UX improvements
- ⚡ Performance optimizations
- 🧪 Test coverage improvements
- 🔧 Build/tooling improvements

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/personal-website.git
   cd personal-website
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/personal-website.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your local main
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use type inference where appropriate

**Example**:
```typescript
// Good
interface Project {
  id: string;
  title: string;
  technologies: string[];
}

const project: Project = {
  id: 'proj-1',
  title: 'My Project',
  technologies: ['React', 'TypeScript']
};

// Avoid
const project: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

**Example**:
```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Keep custom CSS minimal
- Use consistent spacing scale

**Example**:
```tsx
// Good - Tailwind utilities
<div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6 md:p-8">
  {/* Content */}
</div>

// Avoid - Inline styles
<div style={{ display: 'flex', padding: '24px' }}>
  {/* Content */}
</div>
```

### File Organization

```
src/
├── components/
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections
│   └── ui/             # Reusable UI components
├── data/               # JSON content files
├── lib/                # Utility functions
├── types/              # TypeScript types
└── app/                # Next.js app directory
```

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `Hero.tsx`)
- **Files**: kebab-case for non-components (`utils.ts`, `profile.json`)
- **Variables**: camelCase (`userName`, `projectList`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)
- **Types/Interfaces**: PascalCase (`UserProfile`, `ProjectData`)

## Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or tooling changes

### Examples

```bash
# Feature
git commit -m "feat(hero): add animated scroll indicator"

# Bug fix
git commit -m "fix(navigation): resolve mobile menu not closing on link click"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Multiple changes
git commit -m "refactor(components): extract common button logic

- Create reusable Button component
- Update all sections to use new Button
- Add unit tests for Button component"
```

### Commit Best Practices

- Write clear, descriptive messages
- Keep commits focused and atomic
- Reference issues when applicable (`fixes #123`)
- Use present tense ("add feature" not "added feature")

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   npm run test:run
   npm run test:e2e
   ```

3. **Run linter**
   ```bash
   npm run lint
   ```

4. **Build successfully**
   ```bash
   npm run build
   ```

5. **Update documentation** if needed

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub**
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Title**: Follow commit message format
   ```
   feat(hero): add animated scroll indicator
   ```

4. **PR Description**: Include
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Screenshots (if UI changes)
   - Related issues

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

1. **Automated checks** must pass (tests, linting, build)
2. **Code review** by maintainer
3. **Address feedback** if requested
4. **Approval** and merge

### After Merge

1. **Delete your branch**
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Update your main branch**
   ```bash
   git checkout main
   git pull upstream main
   ```

## Testing Requirements

### Unit Tests

All new components must include unit tests:

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Tests

For new features affecting user flows:

```typescript
// feature.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate to section', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page.locator('#about')).toBeInViewport();
});
```

### Accessibility Tests

Include accessibility checks:

```typescript
import { axe } from 'jest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Running Tests

```bash
# Unit tests
npm test                 # Watch mode
npm run test:run        # Run once
npm run test:ui         # UI mode

# E2E tests
npm run test:e2e        # Headless
npm run test:e2e:ui     # UI mode
npm run test:e2e:headed # See browser
```

## Documentation

### Code Comments

- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date
- Use JSDoc for functions

**Example**:
```typescript
/**
 * Calculates the reading time for a blog post
 * @param content - The post content in markdown
 * @returns Reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Modifying scripts
- Adding dependencies

### Content Guide Updates

Update CONTENT_GUIDE.md when:
- Changing data structure
- Adding new content types
- Modifying JSON schemas

## Questions?

- Open an issue for questions
- Check existing issues and PRs
- Review documentation thoroughly

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes (for significant contributions)
- Project documentation (for major features)

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

---

Thank you for contributing! 🎉

