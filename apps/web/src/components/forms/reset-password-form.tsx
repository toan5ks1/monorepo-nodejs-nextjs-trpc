'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// import { catchClerkError } from '@/lib/utils'
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
import { Icons } from '@ui/components/molecules/icons'
import {
  type FormTypeResetPassword,
  useFormResetPassword,
} from '@pod-platform/forms/src/form'

export function ResetPasswordForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useFormResetPassword()

  function onSubmit(data: FormTypeResetPassword) {
    // startTransition(async () => {
    //   try {
    //     const firstFactor = await signIn.create({
    //       strategy: 'reset_password_email_code',
    //       identifier: data.email,
    //     })
    //     if (firstFactor.status === 'needs_first_factor') {
    //       router.push('/signin/reset-password/confirm')
    //       toast.message('Check your email', {
    //         description: 'We sent you a 6-digit verification code.',
    //       })
    //     }
    //   } catch (err) {
    //     catchClerkError(err)
    //   }
    // })
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
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">
            Continue to reset password verification
          </span>
        </Button>
      </form>
    </Form>
  )
}
