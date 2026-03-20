import * as React from 'react'
import { cn } from '@/lib/utils'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean
}

export function GlassCard({ className, children, gradient = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card relative overflow-hidden',
        className
      )}
      {...props}
    >
      {gradient && (
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}
