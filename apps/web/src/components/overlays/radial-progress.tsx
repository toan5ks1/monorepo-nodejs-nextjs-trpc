import React, { useState, useEffect } from 'react'
import { cn } from '@ui/lib/utils'

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
  size?: number // Optional prop to specify size, use parent's full size if not provided
}

const CircularProgress = ({
  progress,
  children,
  className,
  size = 120, // Default size if not provided
  ...props
}: CircularProgressProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const radius = size / 2 - 4 // Subtract stroke width to keep the circle inside the SVG
  const circumference = 2 * Math.PI * radius // Circumference of the circle
  const dotSize = 1 // Size of each dot
  const gapSize = 3 // Size of the gap between dots
  const totalDots = Math.ceil(circumference / (dotSize + gapSize))
  const filledDots = Math.ceil((animatedProgress / 100) * totalDots)
  const strokeArray = Array.from({ length: totalDots }, (_, i) =>
    i < filledDots ? `${dotSize} ${gapSize}` : `0 ${dotSize + gapSize}`,
  ).join(', ')

  useEffect(() => {
    if (animatedProgress < progress) {
      const diff = progress - animatedProgress
      const increment = Math.max(0.1, diff * 0.1) // This ensures easing and prevents it from stalling
      const timeoutId = setTimeout(() => {
        setAnimatedProgress((prev) => Math.min(prev + increment, progress))
      }, 20) // Control speed of animation here
      return () => clearTimeout(timeoutId)
    }
  }, [animatedProgress, progress])

  return (
    <div className={cn('relative w-full h-full', className)} {...props}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="text-muted"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="4"
          strokeDasharray={`${dotSize} ${gapSize}`}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-green-500"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="4"
          strokeDasharray={strokeArray}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center p-[8%]">
        {children}
      </div>
    </div>
  )
}

export default CircularProgress
