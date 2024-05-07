import { type Metadata } from 'next'
import Link from 'next/link'
import { env } from '@/env.mjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card'
import { OAuthSignIn } from '@ui/components/auth/oauth-signin'
import { SignInForm } from '@/components/forms/signin-form'
import { Shell } from '@ui/components/shells/shell'
import { Checkbox } from '@ui/components/ui/checkbox'
import { Icons } from '@ui/components/molecules/icons'
import { IdVerifyDrawer } from '@/components/modals/verify-id-drawer'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Sign In',
  description: 'Sign in to your account',
}

export default function SignInPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Mở tài khoản trực tuyến</CardTitle>
          <CardDescription className="flex items-center">
            <Icons.info className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
            Dành cho khách hàng trong nước
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <IdVerifyDrawer />
        </CardContent>
        {/* <CardFooter className="flex flex-wrap items-center justify-between gap-2"></CardFooter> */}
      </Card>
    </Shell>
  )
}
