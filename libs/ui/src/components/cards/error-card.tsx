'use client'

import * as React from 'react'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { cn } from '../../util'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { buttonVariants } from '../ui/button'
import { ClientButton } from '../molecules/client-button'

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  retryLink?: string
  retryLinkText?: string
  reset?: () => void
}

export function ErrorCard({
  icon: Icon = ExclamationTriangleIcon,
  title,
  description,
  retryLink,
  retryLinkText = 'Go back',
  reset,
  className,
  ...props
}: ErrorCardProps) {
  return (
    <Card
      as="section"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        'flex w-full min-w-0 flex-col items-center justify-center overflow-hidden p-10',
        className,
      )}
      {...props}
    >
      <div className="grid place-items-center rounded-full border border-dashed border-muted-foreground/75 p-6">
        <Icon
          className="h-10 w-10 text-muted-foreground/75"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-1.5 py-14 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-clamp-4">
          {description}
        </CardDescription>
      </div>
      {retryLink ? (
        <Link
          href={retryLink}
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
          )}
        >
          {retryLinkText}
          <span className="sr-only">{retryLinkText}</span>
        </Link>
      ) : null}
      {reset ? (
        <ClientButton aria-label="Retry" variant="ghost" onClick={reset}>
          Retry
        </ClientButton>
      ) : null}
    </Card>
  )
}
