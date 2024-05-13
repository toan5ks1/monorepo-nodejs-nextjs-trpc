import React from 'react'
import Image from 'next/image'
import { Badge } from '@ui/components/ui/badge'

const IDPlaceHolderBack = () => {
  return (
    <div className="w-full relative aspect-[15/9] border border-ring border-dashed rounded-md shadow-lg">
      <Image
        src="/images/id-back-side.webp"
        alt="Mặt sau"
        className="object-cover rounded-sm blur-xxs"
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
        fill
        priority
      />
      <Badge
        className="absolute min-w-20 justify-center rounded-full opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        variant="secondary"
      >
        Mặt sau
      </Badge>
    </div>
  )
}

export default IDPlaceHolderBack
