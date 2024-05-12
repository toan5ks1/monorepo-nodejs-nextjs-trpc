'use client'

import { CardHeader, CardTitle } from '@ui/components/ui/card'
import { Progress } from '@ui/components/ui/progress'
import { useGlobalState } from '@/components/providers/global-context'
import { Suspense, useCallback } from 'react'
import { StepTitle } from '@/utils/config'
import dynamic from 'next/dynamic'

const IDVerify = dynamic(
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
const FaceVerify = dynamic(
  () => import('@/components/steps/(step-3)/verify-face'),
  {
    ssr: false,
  },
)

export default function VerificationRoot() {
  const { step, title } = useGlobalState()
  const totalStep = StepTitle.__LENGTH

  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <IDVerify />
      case 1:
        return <VerifyIDResult />
      case 2:
        return <FaceVerify />
    }
  }, [step])

  return (
    <div className="flex justify-start items-center flex-col pt-0 pb-6 2xl:w-1/2 xl:w-3/5 plg:w-3/4 sm:w-3/4 w-full">
      <CardHeader className="w-full px-4 sm:px-0">
        <CardTitle className="text-2xl text-left">{title}</CardTitle>
        <Progress className="h-1" value={(step / totalStep) * 100} />
      </CardHeader>

      {renderStep()}
    </div>
  )
}
