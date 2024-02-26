'use client'

import * as React from 'react'
// import { useRouter } from 'next/navigation'
// import { useSignIn } from "@clerk/nextjs"
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import type { z } from 'zod'
import { signIn } from 'next-auth/react'

import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Icons } from '../icons'
import { PasswordInput } from '../password-input'
import {
  FormTypeSignIn,
  userFormSignIn,
} from '@foundation-trpc/forms/src/signin'

// type Inputs = z.infer<typeof authSchema>

export function SignInForm() {
  // const router = useRouter()
  // const { isLoaded, signIn, setActive } = useSignIn()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = userFormSignIn()

  function onSubmit({ email, password }: FormTypeSignIn) {
    // if (!isLoaded) return

    startTransition(async () => {
      signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      })
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="rodneymullen180@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  )
}
