import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      hoverable = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'rounded-lg transition-all duration-200 p-4 sm:p-6 md:p-8';

    const variantStyles = {
      default: 'bg-white shadow-md',
      elevated: 'bg-white shadow-lg',
      outlined: 'bg-white border-2 border-gray-200',
    };

    const hoverStyles = hoverable
      ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
      : '';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`;

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
