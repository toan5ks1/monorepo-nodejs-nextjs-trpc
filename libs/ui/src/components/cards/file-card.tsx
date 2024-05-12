'use client'

import Image from 'next/image'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@ui/components/ui/button'

interface FileCardProps {
  file: string
  onRemove: () => void
}

export function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <div className="relative flex w-full">
      <Image
        src={file}
        alt="id-card"
        width={48}
        height={48}
        loading="lazy"
        className="w-full aspect-[15/9] shrink-0 rounded-md object-cover"
      />
      {file && (
        <div className="flex items-start gap-2">
          <Button
            type="button"
            size="icon"
            className="sm:size-6 size-4 ml-[-50%] mt-[-50%]"
            onClick={onRemove}
          >
            <Cross2Icon
              color="white"
              className="sm:size-4 size-3"
              aria-hidden="true"
            />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  )
}
