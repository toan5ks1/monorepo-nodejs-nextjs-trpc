'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
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
import {
  FormTypeVerifyEmail,
  useFormVerifyEmail,
} from '@foundation-trpc/forms/src/form'
import { catchError } from '../../util'

export function VerifyEmailForm() {
  const router = useRouter()
  // const { isLoaded, signUp, setActive } = useSignUp()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useFormVerifyEmail()

  function onSubmit(data: FormTypeVerifyEmail) {
    // if (!isLoaded) return

    startTransition(async () => {
      try {
        // const completeSignUp = await signUp.attemptEmailAddressVerification({
        //   code: data.code,
        // })
        // if (completeSignUp.status !== "complete") {
        //   /*  investigate the response, to see if there was an error
        //      or if the user needs to complete more steps.*/
        //   console.log(JSON.stringify(completeSignUp, null, 2))
        // }
        // if (completeSignUp.status === "complete") {
        //   await setActive({ session: completeSignUp.createdSessionId })
        //   router.push(`${window.location.origin}/`)
        // }
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="169420"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    field.onChange(e)
                  }}
                />
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
          Create account
          <span className="sr-only">Create account</span>
        </Button>
      </form>
    </Form>
  )
}
