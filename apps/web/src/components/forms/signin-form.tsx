'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@ui/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/components/ui/form'
import { Input } from '@ui/components/ui/input'
import { Icons } from '@ui/components/other/icons'
import { PasswordInput } from '@ui/components/other/password-input'
import { FormTypeSignIn, useFormSignIn } from '@pod-platform/forms/src/form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { catchError } from '@/libs/util'
import { useTransition } from 'react'

export function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
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
          console.log(res)
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
