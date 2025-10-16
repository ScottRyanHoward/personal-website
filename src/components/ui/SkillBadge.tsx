import React from 'react';

export interface SkillBadgeProps {
  name: string;
  category?: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  'programming-languages': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  languages: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  frameworks: 'bg-green-100 text-green-800 hover:bg-green-200',
  tools: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  databases: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  cloud: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
  'soft-skills': 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  other: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

const getCategoryColor = (category?: string): string => {
  if (!category) return categoryColors.default;
  
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  return categoryColors[normalizedCategory] || categoryColors.default;
};

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  category,
  className = '',
}) => {
  const colorClasses = getCategoryColor(category);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200 ${colorClasses} ${className}`}
      role="listitem"
      aria-label={category ? `${name} - ${category}` : name}
    >
      {name}
    </span>
  );
};

SkillBadge.displayName = 'SkillBadge';
