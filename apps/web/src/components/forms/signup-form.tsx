'use client'

import * as React from 'react'
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
import { FormTypeRegister, useFormRegister } from '@pod-platform/forms/src/form'
// import { trpcClient } from '@pod-platform/trpc-client/src/client'
import { useRouter } from 'next/navigation'
// import { catchError } from '../../util'
import { toast } from 'sonner'
import { catchError } from '@/utils'

export function SignUpForm() {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const form = useFormRegister()
  // const { mutateAsync: signUp } =
  //   trpcClient.auth.registerWithCredentials.useMutation()
  // const { mutateAsync: sendMailVerification } =
  //   trpcClient.auth.generateVerificationToken.useMutation()

  function onSubmit(data: FormTypeRegister) {
    // startTransition(async () => {
    //   try {
    //     const user = await signUp(data)
    //     if (user?.user) {
    //       await sendMailVerification({ email: data.email })
    //       router.push('/signup/verify-email')
    //       toast.message('Check your email', {
    //         description: 'We sent you a verification link.',
    //       })
    //     }
    //   } catch (err) {
    //     catchError(err)
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
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}
