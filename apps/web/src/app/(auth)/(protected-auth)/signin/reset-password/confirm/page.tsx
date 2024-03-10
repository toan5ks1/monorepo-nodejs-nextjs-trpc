import { type Metadata } from 'next'
import { env } from '@web/src/env.mjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@cmp/ui/card'
import { ResetPasswordConfirmForm } from '@cmp/forms/reset-password-confirm-form'
import { Shell } from '@cmp/shells/shell'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Reset Password',
  description: 'Enter your email to reset your password',
}

export default function ResetPasswordConfirmPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordConfirmForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
