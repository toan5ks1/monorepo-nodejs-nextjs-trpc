'use client'

import * as React from 'react'
// import { useRouter } from 'next/navigation'
// import { useSignUp } from "@clerk/nextjs"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import type { z } from "zod"

// import { catchClerkError } from "@/lib/utils"
// import { authSchema } from '@/lib/validations/auth'
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
  FormTypeRegister,
  userFormRegister,
} from '@foundation-trpc/forms/src/register'
import { trpcClient } from '@foundation-trpc/trpc-client/src/client'
import { signIn } from 'next-auth/react'

// type Inputs = z.infer<typeof authSchema>

export function SignUpForm() {
  // const router = useRouter()
  // const { isLoaded, signUp } = useSignUp()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  // const form = useForm<Inputs>({
  //   resolver: zodResolver(authSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // })

  const form = userFormRegister()
  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation()

  function onSubmit(data: FormTypeRegister) {
    // if (!isLoaded) return

    startTransition(async () => {
      const user = await mutateAsync(data)
      if (user?.user) {
        signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: '/',
        })
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
