# Personal Projects Section Implementation

## Overview
The Personal Projects section displays a user's side projects and open-source contributions in a responsive grid layout. This section is distinct from Work Projects and emphasizes personal initiative, motivation, and learning.

## Components

### PersonalProjects (Main Section Component)
**Location:** `src/components/sections/PersonalProjects.tsx`

**Purpose:** Container component that renders the personal projects section with a grid of project cards.

**Key Features:**
- Responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- Section heading and description
- Empty state handling
- Semantic HTML with proper ARIA labels
- White background to differentiate from Work Projects section

**Props:** None (uses data from `personalProjects.json`)

**Data Source:** `src/data/personalProjects.json`

### PersonalProjectCard (UI Component)
**Location:** `src/components/ui/PersonalProjectCard.tsx`

**Purpose:** Displays individual personal project information in a card format.

**Key Features:**
- Project image with lazy loading
- Project title and status badge
- Date range display (formatted as "MMM YYYY - MMM YYYY" or "MMM YYYY" for ongoing)
- Project description
- Motivation section (highlighted with blue background and left border)
- Technology tags (purple styling to differentiate from work projects)
- Action buttons for demo and repository links
- Status indicators (completed, in-progress, archived)
- Responsive design with hover effects

**Props:**
```typescript
interface PersonalProjectCardProps {
  project: PersonalProject;
}
```

## Data Model

```typescript
interface PersonalProject {
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
  startDate: string; // Format: "YYYY-MM"
  endDate?: string; // Format: "YYYY-MM"
  status: 'completed' | 'in-progress' | 'archived';
}
```

## Styling Decisions

### Color Scheme
- **Technology Tags:** Purple (`bg-purple-100 text-purple-800`) to differentiate from work projects (blue)
- **Demo Button:** Purple (`bg-purple-600`) to match the personal project theme
- **Motivation Box:** Blue background (`bg-blue-50`) with blue left border (`border-blue-400`)
- **Status Badges:**
  - Completed: Green (`bg-green-100 text-green-800`)
  - In Progress: Blue (`bg-blue-100 text-blue-800`)
  - Archived: Gray (`bg-gray-100 text-gray-800`)

### Layout
- **Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Gap:** `gap-6 lg:gap-8`
- **Section Background:** White (`bg-white`) to contrast with Work Projects (gray)
- **Card Hover:** Shadow elevation and slight upward translation

## Accessibility Features

1. **Semantic HTML:**
   - `<section>` with `id="personal-projects"`
   - `aria-labelledby` pointing to section heading
   - Proper heading hierarchy

2. **ARIA Labels:**
   - Status badges have `aria-label` describing the project status
   - Links have descriptive `aria-label` attributes
   - Images have descriptive `alt` text

3. **Keyboard Navigation:**
   - All interactive elements are keyboard accessible
   - Focus states on buttons and links
   - Proper tab order

4. **Screen Reader Support:**
   - Descriptive link text
   - Hidden decorative SVG icons with `aria-hidden="true"`
   - Status information announced properly

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Full-width cards
- Stacked buttons
- Compact spacing

### Tablet (640px - 1024px)
- Two-column grid
- Larger cards
- More whitespace

### Desktop (> 1024px)
- Three-column grid
- Maximum width container (`max-w-7xl`)
- Optimal card proportions
- Enhanced hover effects

## Date Formatting

The `formatDateRange` function formats dates as follows:
- **With end date:** "May 2022 - Dec 2022"
- **Without end date:** "May 2022" (for ongoing projects)
- **Format:** Month abbreviation + Year

## Differences from Work Projects

1. **Motivation Section:** Personal projects include a "Why" section explaining the motivation
2. **Status Indicators:** Shows project status (completed, in-progress, archived)
3. **Color Scheme:** Purple theme instead of blue
4. **No Company Association:** Personal projects don't link to work experience
5. **Background Color:** White background vs. gray for work projects

## Testing

### Unit Tests
**Location:** `src/components/sections/PersonalProjects.test.tsx` and `src/components/ui/PersonalProjectCard.test.tsx`

**Coverage:**
- Component rendering
- Data display (title, description, motivation, dates)
- Status badge rendering and styling
- Technology tags display
- Image rendering and fallback
- Link rendering (demo and repository)
- Accessibility attributes
- Responsive grid classes
- Empty state handling

### Test Commands
```bash
# Run all tests
npm test

# Run specific test file
npm test -- PersonalProjects.test.tsx
npm test -- PersonalProjectCard.test.tsx

# Run with coverage
npm test -- --coverage
```

## Usage Example

```tsx
import { PersonalProjects } from '@/components/sections';

function App() {
  return (
    <main>
      <PersonalProjects />
    </main>
  );
}
```

## Future Enhancements

1. **Filtering:** Add ability to filter by technology or status
2. **Sorting:** Allow sorting by date, status, or featured
3. **Search:** Add search functionality
4. **Modal View:** Detailed project view in a modal
5. **GitHub Integration:** Fetch project stats from GitHub API
6. **Tags:** Add custom tags beyond technologies
7. **Animations:** Add scroll animations for cards
8. **Pagination:** For users with many projects

## Requirements Satisfied

This implementation satisfies the following requirements from the spec:

- **5.1:** Displays a separate list of personal/side projects
- **5.2:** Shows project name, description, motivation, and technologies
- **5.3:** Clearly distinguishes personal projects from work projects
- **5.4:** Provides clickable links to demos and repositories
- **5.5:** Displays project screenshots/thumbnails
- **5.6:** Shows time period or date when projects were created
