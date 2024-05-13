import { type Metadata } from 'next'
import Link from 'next/link'
import { env } from '@/env.mjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card'
import { SignInForm } from '@/components/forms/signin-form'
import { Shell } from '@ui/components/shells/shell'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL as string),
  title: 'Register',
  description: 'Sign up to your account',
}

export default function SignInPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Mở tài khoản trực tuyến</CardTitle>
          <CardDescription className="flex items-center">
            {/* <Icons.info className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> */}
            Dành cho khách hàng trong nước
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignInForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
