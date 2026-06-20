import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-white',
      secondary: 'border-transparent bg-gray-100 text-gray-700',
      outline: 'border-border text-gray-700',
      success: 'border-[#A7F3D0] bg-[#D1FAE5] text-[#065F46]',
      muted: 'border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
