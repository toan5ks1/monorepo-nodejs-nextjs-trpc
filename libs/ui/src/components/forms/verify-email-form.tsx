'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { BarLoader } from 'react-spinners'
import Link from 'next/link'
import { InfoCard } from '../cards/info-card'
import { trpcClient } from '@foundation-trpc/trpc-client/src/client'

export function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { data: verifyResult } = trpcClient.auth.verifyEmailToken.useQuery({
    token: token ?? '',
  })

  if (verifyResult?.success) {
    router.push('/')
  }

  return (
    <div className="flex flex-col items-left w-full justify-center space-y-8">
      {!token ? (
        <InfoCard
          type={{ success: true, message: 'Confirmation email sent!' }}
        />
      ) : !verifyResult ? (
        <BarLoader width={'100%'} />
      ) : (
        <InfoCard type={verifyResult} />
      )}

      <Button className="w-full">
        <Link aria-label="Back to login" href="/">
          Back to login
        </Link>
      </Button>
    </div>
  )
}
