import React from 'react';
import { cn } from '@/src/utils/cn';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'secondary' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-primary text-primary-fg border-transparent',
    secondary: 'bg-muted text-muted-fg border-transparent',
    outline: 'text-fg border-border',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
