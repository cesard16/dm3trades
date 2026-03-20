import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function GradientText({ className, children, ...props }: GradientTextProps) {
  return (
    <span
      id="gradient-text"
      className={cn(
        'text-gradient font-bold drop-shadow-[0_0_15px_rgba(0,208,132,0.3)] bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
