'use client'

import { useGlobalState } from '@/components/providers/global-context'
import { useCallback } from 'react'
import { StepTitle } from '@/utils/config'
import dynamic from 'next/dynamic'
import { CardHeader, CardTitle } from '@ui/components/ui/card'
import { Progress } from '@ui/components/ui/progress'

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
        return <FaceVerify />
      case 2:
        return <VerifyIDResult />
    }
  }, [step])

  return (
    <div className="flex justify-start items-center flex-col pt-6 pb-8 2xl:w-1/2 xl:w-3/5 plg:w-3/4 sm:w-3/4 w-full">
      <div className="bg-background sm:bg-prebackground h-full w-full flex flex-col items-center justify-between rounded-xl sm:border sm:shadow border-0 text-card-foreground shadow-none">
        <CardHeader className="w-full px-4">
          <CardTitle className="text-2xl text-left">{title}</CardTitle>
          <Progress className="h-1" value={((step + 1) / totalStep) * 100} />
        </CardHeader>
        {renderStep()}
      </div>
    </div>
  )
}
