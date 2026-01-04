import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline, TimelineItem } from './Timeline';

describe('Timeline Component', () => {
  const mockItems = [
    {
      date: 'Jan 2023 - Present',
      title: 'Senior Developer',
      subtitle: 'Tech Company',
      description: 'Leading development team',
    },
    {
      date: 'Jan 2021 - Dec 2022',
      title: 'Developer',
      subtitle: 'Another Company',
      description: 'Building web applications',
    },
    {
      date: 'Jan 2019 - Dec 2020',
      title: 'Junior Developer',
      subtitle: 'Startup Inc',
      description: 'Learning and growing',
    },
  ];

  describe('Rendering', () => {
    it('renders all timeline items', () => {
      render(<Timeline items={mockItems} />);

      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText('Developer')).toBeInTheDocument();
      expect(screen.getByText('Junior Developer')).toBeInTheDocument();
    });

    it('renders dates for all items', () => {
      render(<Timeline items={mockItems} />);

      expect(screen.getByText('Jan 2023 - Present')).toBeInTheDocument();
      expect(screen.getByText('Jan 2021 - Dec 2022')).toBeInTheDocument();
      expect(screen.getByText('Jan 2019 - Dec 2020')).toBeInTheDocument();
    });

    it('renders subtitles when provided', () => {
      render(<Timeline items={mockItems} />);

      expect(screen.getByText('Tech Company')).toBeInTheDocument();
      expect(screen.getByText('Another Company')).toBeInTheDocument();
      expect(screen.getByText('Startup Inc')).toBeInTheDocument();
    });

    it('renders descriptions when provided', () => {
      render(<Timeline items={mockItems} />);

      expect(screen.getByText('Leading development team')).toBeInTheDocument();
      expect(screen.getByText('Building web applications')).toBeInTheDocument();
      expect(screen.getByText('Learning and growing')).toBeInTheDocument();
    });

    it('renders empty timeline with no items', () => {
      const { container } = render(<Timeline items={[]} />);
      const timeline = container.querySelector('[role="list"]');
      expect(timeline).toBeInTheDocument();
      expect(timeline?.children).toHaveLength(0);
    });
  });

  describe('Timeline Structure', () => {
    it('has proper semantic role', () => {
      render(<Timeline items={mockItems} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders items with listitem role', () => {
      render(<Timeline items={mockItems} />);
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    it('uses time element for dates', () => {
      const { container } = render(<Timeline items={mockItems} />);
      const timeElements = container.querySelectorAll('time');
      expect(timeElements).toHaveLength(3);
    });
  });

  describe('Custom Content', () => {
    it('renders custom children content', () => {
      const itemsWithChildren = [
        {
          date: 'Jan 2023',
          title: 'Position',
          children: <div data-testid="custom-content">Custom content</div>,
        },
      ];

      render(<Timeline items={itemsWithChildren} />);
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('renders items without optional fields', () => {
      const minimalItems = [
        {
          date: 'Jan 2023',
          title: 'Position Only',
        },
      ];

      render(<Timeline items={minimalItems} />);
      expect(screen.getByText('Position Only')).toBeInTheDocument();
      expect(screen.getByText('Jan 2023')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <Timeline items={mockItems} className="custom-timeline" />
      );
      const timeline = container.querySelector('[role="list"]');
      expect(timeline).toHaveClass('custom-timeline');
    });

    it('has responsive design classes', () => {
      const { container } = render(<Timeline items={mockItems} />);
      const timeline = container.querySelector('[role="list"]');
      expect(timeline).toHaveClass('w-full');
    });
  });

  describe('Visual Indicators', () => {
    it('renders date markers for each item', () => {
      const { container } = render(<Timeline items={mockItems} />);
      // Check for marker circles (olive green background)
      const markers = container.querySelectorAll('.bg-primary-600');
      expect(markers.length).toBeGreaterThan(0);
    });

    it('renders connecting lines between items', () => {
      const { container } = render(<Timeline items={mockItems} />);
      // Check for connecting lines (gray background)
      const lines = container.querySelectorAll('.bg-gray-300');
      // Should have lines for all items except the last one
      expect(lines.length).toBeGreaterThan(0);
    });
  });
});

describe('TimelineItem Component', () => {
  describe('Rendering', () => {
    it('renders with required props', () => {
      render(<TimelineItem date="Jan 2023" title="Test Title" />);

      expect(screen.getByText('Jan 2023')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders with all props', () => {
      render(
        <TimelineItem
          date="Jan 2023"
          title="Test Title"
          subtitle="Test Subtitle"
          description="Test Description"
        />
      );

      expect(screen.getByText('Jan 2023')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders children when provided', () => {
      render(
        <TimelineItem date="Jan 2023" title="Test Title">
          <div data-testid="child-content">Child content</div>
        </TimelineItem>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });
  });

  describe('Last Item Behavior', () => {
    it('shows connecting line when not last item', () => {
      const { container } = render(
        <TimelineItem date="Jan 2023" title="Test Title" isLast={false} />
      );

      const line = container.querySelector('.bg-gray-300');
      expect(line).toBeInTheDocument();
    });

    it('hides connecting line when last item', () => {
      const { container } = render(
        <TimelineItem date="Jan 2023" title="Test Title" isLast={true} />
      );

      const line = container.querySelector('.bg-gray-300');
      expect(line).not.toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive text sizes', () => {
      const { container } = render(
        <TimelineItem
          date="Jan 2023"
          title="Test Title"
          subtitle="Test Subtitle"
          description="Test Description"
        />
      );

      // Check for responsive classes
      const title = screen.getByText('Test Title');
      expect(title).toHaveClass('text-lg', 'md:text-xl');

      const date = screen.getByText('Jan 2023');
      expect(date).toHaveClass('text-sm', 'md:text-base');
    });

    it('has responsive marker sizes', () => {
      const { container } = render(
        <TimelineItem date="Jan 2023" title="Test Title" />
      );

      const marker = container.querySelector('.bg-primary-600');
      expect(marker).toHaveClass('h-10', 'w-10', 'md:h-12', 'md:w-12');
    });

    it('has responsive gap spacing', () => {
      const { container } = render(
        <TimelineItem date="Jan 2023" title="Test Title" />
      );

      const itemContainer = container.querySelector('.relative');
      expect(itemContainer).toHaveClass('gap-4', 'md:gap-6');
    });
  });
});
