import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      icon,
      iconPosition = 'left',
      children,
      className = '',
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
      outline:
        'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="inline-flex" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="inline-flex" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
