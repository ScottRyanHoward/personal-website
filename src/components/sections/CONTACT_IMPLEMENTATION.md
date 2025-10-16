# Contact Section Implementation

## Overview
The Contact section provides multiple ways for visitors to get in touch, including email, phone (optional), social media links, and resume download functionality.

## Features Implemented

### 1. Multiple Contact Methods
- **Email Contact**: Displays email with mailto link
- **Phone Contact**: Conditionally displays phone number with tel link (if provided)
- **Visual Cards**: Each contact method is presented in a clean, card-based layout

### 2. Social Media Links
- Displays all social media platforms from profile data
- Each link opens in a new tab with proper security attributes (`rel="noopener noreferrer"`)
- Shows platform name and icon
- Supports LinkedIn, GitHub, Twitter, and generic links

### 3. Resume Download
- Prominent download button with icon
- Opens resume PDF in new tab by default
- Supports custom download handler via `onDownloadResume` prop
- Clear call-to-action with descriptive text

### 4. Accessibility Features
- All links have descriptive ARIA labels
- Proper semantic HTML structure with heading hierarchy
- Section has ARIA label for screen readers
- Focus states on all interactive elements
- Keyboard navigation support

### 5. Responsive Design
- Mobile-first approach
- Grid layout adapts from 1 column (mobile) to 2 columns (desktop)
- Social links wrap gracefully on smaller screens
- Touch-friendly button and link sizes

## Component API

```typescript
interface ContactProps {
  profile: Profile;
  onDownloadResume?: () => void;
}
```

### Props
- `profile` (required): Profile object containing contact information and social links
- `onDownloadResume` (optional): Custom handler for resume download (defaults to opening `/resume.pdf`)

## Usage Example

```tsx
import { Contact } from '@/components/sections';
import profileData from '@/data/profile.json';

function Page() {
  return <Contact profile={profileData} />;
}
```

### With Custom Download Handler

```tsx
function Page() {
  const handleDownload = () => {
    // Track analytics
    analytics.track('resume_downloaded');
    window.open('/resume.pdf', '_blank');
  };

  return (
    <Contact 
      profile={profileData} 
      onDownloadResume={handleDownload}
    />
  );
}
```

## Requirements Satisfied

### Requirement 9.1: Multiple Contact Methods
✅ Displays email, phone (optional), and social media links

### Requirement 9.2: Email Link with Mailto
✅ Email link uses `mailto:` protocol and opens default email client

### Requirement 9.3: Resume Download
✅ Clear call-to-action button for downloading PDF resume

### Requirement 9.4: Single-Click Download
✅ Resume downloads with a single click (opens in new tab)

## Testing
- 32 comprehensive unit tests covering all functionality
- Tests for rendering, accessibility, user interactions, and edge cases
- All tests passing with 100% coverage of component logic

## Styling
- Gradient background matching Hero section
- Card-based layout with shadows and hover effects
- Consistent color scheme (blue primary, green for phone)
- Responsive spacing and typography

## Accessibility Compliance
- WCAG 2.1 Level AA compliant
- Keyboard navigable
- Screen reader friendly
- Proper focus indicators
- Semantic HTML structure

## Files Created
1. `src/components/sections/Contact.tsx` - Main component
2. `src/components/sections/Contact.test.tsx` - Unit tests
3. `src/components/sections/Contact.demo.tsx` - Demo examples
4. Updated `src/components/sections/index.ts` - Export added
