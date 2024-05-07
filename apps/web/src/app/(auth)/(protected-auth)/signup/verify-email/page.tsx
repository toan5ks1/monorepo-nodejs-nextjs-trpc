import { type Metadata } from 'next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card'
// import { VerifyEmailForm } from '@/components/forms/verify-email-form'
import { Shell } from '@ui/components/shells/shell'
import { env } from '@/env.mjs'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Verify Email',
  description: 'Verify your email address to continue with your sign up',
}

export default function VerifyEmailPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify email</CardTitle>
          <CardDescription>
            Verify your email address to complete your account creation
          </CardDescription>
        </CardHeader>
        <CardContent>{/* <VerifyEmailForm /> */}</CardContent>
      </Card>
    </Shell>
  )
}
