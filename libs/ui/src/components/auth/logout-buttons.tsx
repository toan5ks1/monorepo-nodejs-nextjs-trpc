'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '../../util'
import { useMounted } from '@pod-platform/util/hooks/use-mounted'
import { Button, buttonVariants } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Icons } from '../icons'
import { signOut } from 'next-auth/react'

export function LogOutButtons() {
  const router = useRouter()
  const mounted = useMounted()
  const [isPending, startTransition] = React.useTransition()

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <Button
          aria-label="Log out"
          size="sm"
          className="w-full"
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            })
          }
        >
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Log out
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: 'sm' }),
            'w-full bg-muted text-muted-foreground',
          )}
        >
          Log out
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  )
}
