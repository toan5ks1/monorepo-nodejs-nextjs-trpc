import * as React from 'react'
import type { Metadata } from 'next'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card'

import { env } from '@/env.mjs'
import { Shell } from '@ui/components/shells/shell'
import { VerifyIDResultForm } from './_components/verify-id-result-form'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Result',
  description: 'Verify ID result',
}

export default function VerifyIDResult() {
  return (
    <Shell variant="sidebar">
      <Card className="sm:border sm:shadow border-0 text-card-foreground shadow-none">
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email preferences</CardDescription>
        </CardHeader>
        <VerifyIDResultForm />
      </Card>
    </Shell>
  )
}
