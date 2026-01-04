import React from 'react';

export interface TimelineItemProps {
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  isLast?: boolean;
}

export interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  subtitle,
  description,
  children,
  isLast = false,
}) => {
  return (
    <div className="relative flex gap-4 pb-8 md:gap-6">
      {/* Date marker and connecting line */}
      <div className="flex flex-col items-center">
        {/* Date marker circle */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white shadow-md md:h-12 md:w-12">
          <div className="h-3 w-3 rounded-full bg-white md:h-4 md:w-4" />
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div className="mt-2 h-full w-0.5 bg-gray-300 md:w-1" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        {/* Date label */}
        <time className="mb-1 block text-sm font-semibold text-gray-600 md:text-base">
          {date}
        </time>

        {/* Title */}
        <h3 className="mb-1 text-lg font-bold text-gray-900 md:text-xl">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="mb-2 text-base font-medium text-gray-700 md:text-lg">
            {subtitle}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="mb-3 text-sm text-gray-600 md:text-base">
            {description}
          </p>
        )}

        {/* Additional content */}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <div className={`w-full ${className}`} role="list">
      {items.map((item, index) => (
        <div key={index} role="listitem">
          <TimelineItem {...item} isLast={index === items.length - 1} />
        </div>
      ))}
    </div>
  );
};

Timeline.displayName = 'Timeline';
TimelineItem.displayName = 'TimelineItem';
