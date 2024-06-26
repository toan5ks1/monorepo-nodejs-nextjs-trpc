'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@ui/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { Icons } from '@ui/molecules/icons'
import { PasswordInput } from '@ui/molecules/password-input'
import { FormTypeSignIn, useFormSignIn } from '@pod-platform/forms/src/form'
// import { catchError } from '../../utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { catchError } from '@/utils'

export function SignInForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const form = useFormSignIn()

  async function onSubmit({ email, password }: FormTypeSignIn) {
    startTransition(async () => {
      try {
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (res?.ok) {
          router.push('/')
          router.refresh()
        } else {
          toast(res?.error)
        }
      } catch (err) {
        catchError(err)
      }
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
