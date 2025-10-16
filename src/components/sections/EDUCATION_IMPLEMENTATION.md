# Education Section Implementation

## Overview
The Education section displays academic degrees and professional certifications in a clean, organized layout. It uses a card-based design that separates degrees from certifications, with both sorted by date (most recent first).

## Component Structure

### Main Component: `Education.tsx`
- **Props**: 
  - `degrees`: Array of Education objects
  - `certifications`: Array of Certification objects
- **Layout**: Two subsections (Education and Certifications)
- **Sorting**: Both degrees and certifications are sorted by date (most recent first)

## Features

### Degrees Display
- Card-based layout with full-width cards
- Shows:
  - Date range (start - end)
  - Degree and field of study
  - Institution name and location
  - GPA (if provided)
  - Description (if provided)
  - Honors and awards (if provided)
- Hover effect for visual feedback

### Certifications Display
- Grid layout (2 columns on desktop, 1 on mobile)
- Shows:
  - Certification name
  - Issuing organization
  - Issue date
  - Expiry date (if applicable)
  - Credential ID (if provided)
  - Link to verify credential (if provided)
- External links open in new tab with security attributes

## Accessibility Features
- Semantic HTML with `<section>`, `<article>`, and `<time>` elements
- ARIA labels for section and articles
- Proper heading hierarchy (h2 → h3 → h4 → h5)
- Keyboard-accessible links with focus states
- Screen reader-friendly date formatting

## Responsive Design
- Mobile: Single column layout for both degrees and certifications
- Tablet/Desktop: 
  - Degrees remain single column for readability
  - Certifications use 2-column grid

## Data Requirements
The component expects data from `src/data/education.json` with the following structure:

```json
{
  "degrees": [
    {
      "id": "edu-1",
      "institution": "University Name",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "location": "City, State",
      "startDate": "2013-09",
      "endDate": "2017-05",
      "gpa": "3.7",
      "honors": ["Honor 1", "Honor 2"],
      "description": "Optional description"
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "issueDate": "2021-08",
      "expiryDate": "2024-08",
      "credentialId": "CERT-12345",
      "credentialUrl": "https://example.com/verify"
    }
  ]
}
```

## Testing
Comprehensive test coverage includes:
- Rendering tests for all elements
- Conditional rendering (GPA, description, honors, expiry date, etc.)
- Date formatting and sorting
- Accessibility features
- Link attributes and security
- Layout and styling

## Usage Example

```tsx
import { Education } from '@/components/sections';
import educationData from '@/data/education.json';

function Page() {
  return (
    <Education
      degrees={educationData.degrees}
      certifications={educationData.certifications}
    />
  );
}
```

## Requirements Satisfied
- **6.1**: Displays academic degrees with institution names and graduation dates
- **6.2**: Displays certifications with issuing organizations and dates
- **6.3**: Orders entries from most recent to oldest
