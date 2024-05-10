import React from 'react'
import Image from 'next/image'
import { Badge } from '@ui/components/ui/badge'

interface IDPlaceHolderProps {
  src: string
  alt: string
}
const IDPlaceHolder = ({ src, alt }: IDPlaceHolderProps) => {
  return (
    <div className="w-full relative aspect-[15/9] border-2 border-dashed rounded-md flex justify-center items-center">
      <Image
        src={src}
        alt={alt}
        className="object-cover rounded-sm blur-xs"
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
        fill
      />
      <Badge
        className="absolute min-w-20 justify-center rounded-full opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        variant="secondary"
      >
        {alt}
      </Badge>
    </div>
  )
}

export default IDPlaceHolder
