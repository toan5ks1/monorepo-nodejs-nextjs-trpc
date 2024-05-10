import * as React from 'react'
import type { Metadata } from 'next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@ui/components/ui/page-header'
// import { Shell } from "@ui/components/shell"

import { env } from '@/env.mjs'
import { Shell } from '@ui/components/shells/shell'
import { FormSkeleton } from './_components/form-skeleton'
import { VerifyIDResultForm } from './_components/verify-id-result-form'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Result',
  description: 'Verify ID result',
}

export default async function VerifyIDResult() {
  const data = {}
  return (
    <Shell variant="sidebar">
      <Card>
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email preferences</CardDescription>
        </CardHeader>
        <React.Suspense fallback={<FormSkeleton />}>
          <VerifyIDResultForm data={data} />
        </React.Suspense>
      </Card>
    </Shell>
  )
}
