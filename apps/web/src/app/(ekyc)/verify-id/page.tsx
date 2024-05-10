'use client'

import { type Metadata } from 'next'
import Link from 'next/link'
import { env } from '@/env.mjs'

import { CardHeader, CardTitle } from '@ui/components/ui/card'
import { Progress } from '@ui/components/ui/progress'
import { useGlobalState } from '@/components/providers/global-context'
import { useCallback, useEffect, useState } from 'react'
import { StepTitle } from '@/utils/config'
import dynamic from 'next/dynamic'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@ui/components/ui/page-header'

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: 'Sign Up',
//   description: 'Register your trading account',
// }

const WebcamCapture = dynamic(
  () => import('@/components/steps/(step-1)/verify-id'),
  {
    ssr: false,
  },
)
const VerifyIDResult = dynamic(
  () => import('@/components/steps/(step-2)/verify-id-result'),
  {
    ssr: false,
  },
)

export default function VerificationPage() {
  const { step, title } = useGlobalState()
  const totalStep = StepTitle.__LENGTH

  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <WebcamCapture />
      case 1:
        return <VerifyIDResult />
    }
  }, [step])

  return (
    <div className="flex justify-start items-center flex-col pt-0 pb-6 xl:w-3/5 plg:w-3/4 sm:w-3/4 w-full">
      <CardHeader className="w-full px-4 sm:px-0">
        <CardTitle className="text-2xl text-left">{title}</CardTitle>
        <Progress className="h-1" value={(step / totalStep) * 100} />
      </CardHeader>
      {renderStep()}
    </div>
  )
}
