'use client'

import * as React from 'react'
// import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs"
// import { type OAuthStrategy } from "@clerk/types"
// import { toast } from 'sonner'

import { Button } from '../ui/button'
import { Icons } from '../icons'

import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

export type OAuthStrategy = 'google' | 'facebook' | 'discord'

const oauthProviders = [
  { name: 'Google', strategy: 'google', icon: 'google' },
  // { name: 'Facebook', strategy: 'facebook', icon: 'facebook' },
  // { name: 'Discord', strategy: 'discord', icon: 'discord' },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}[]

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)

  async function oauthSignIn(provider: OAuthStrategy) {
    try {
      setIsLoading(provider)
      signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      setIsLoading(null)

      const unknownError = 'Something went wrong, please try again.'
      toast.error(unknownError)

      // isClerkAPIResponseError(error)
      //   ? toast.error(error.errors[0]?.longMessage ?? unknownError)
      //   : toast.error(unknownError)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => void oauthSignIn(provider.strategy)}
            disabled={isLoading !== null}
          >
            {isLoading === provider.strategy ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
