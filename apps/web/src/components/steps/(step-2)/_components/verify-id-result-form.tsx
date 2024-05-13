'use client'

import * as React from 'react'
import { Button } from '@ui/components/ui/button'

import { CardContent, CardDescription, CardTitle } from '@ui/components/ui/card'
import { useGlobalState } from '@/components/providers/global-context'

export function VerifyIDResultForm() {
  const { nextStep, updateTitle } = useGlobalState()

  return (
    <CardContent className="flex w-full flex-col gap-4">
      <CardContent className="flex w-full items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base">Communication emails</CardTitle>
          <CardDescription>
            Receive transactional emails, such as order confirmations and
            shipping updates.
          </CardDescription>
        </div>
      </CardContent>
      <CardContent className="flex w-full flex-row items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base">Newsletter emails</CardTitle>
          <CardDescription>
            Receive our monthly newsletter with the latest news and updates.
          </CardDescription>
        </div>
      </CardContent>
      <CardContent className="flex w-full flex-row items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base">Marketing emails</CardTitle>
          <CardDescription>
            Receive marketing emails, including promotions, discounts, and more.
          </CardDescription>
        </div>
      </CardContent>
      <CardContent className="flex w-full flex-row items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base">Marketing emails</CardTitle>
          <CardDescription>
            Receive marketing emails, including promotions, discounts, and more.
          </CardDescription>
        </div>
      </CardContent>
      <CardContent className="flex w-full flex-row items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base">Marketing emails</CardTitle>
          <CardDescription>
            Receive marketing emails, including promotions, discounts, and more.
          </CardDescription>
        </div>
      </CardContent>
      <Button size="sm" className="w-full" onClick={nextStep}>
        Tiếp tục
        <span className="sr-only">Tiếp tục</span>
      </Button>
    </CardContent>
  )
}
