'use client'

import Image from 'next/image'
import { Cross2Icon } from '@radix-ui/react-icons'

// import { formatBytes } from '@/lib/utils'
import { Button } from '@ui/components/ui/button'
// import { Progress } from '@ui/components/ui/progress'

interface FileCardProps {
  file: string | undefined | null
  onRemove: () => void
  side?: string
}

export function FileCard({ file, onRemove, side }: FileCardProps) {
  return (
    <div className="relative flex w-full">
      {file ? (
        <Image
          src={file}
          alt={'test'}
          width={48}
          height={48}
          loading="lazy"
          className="w-full aspect-[15/9] shrink-0 rounded-md object-cover"
        />
      ) : (
        <div className="w-full aspect-[15/9] bg-slate-100 border-white border-2 border-dashed rounded-md flex justify-center items-center">
          {side}
        </div>
      )}
      {file && (
        <div className="flex items-start gap-2">
          <Button
            type="button"
            size="icon"
            className="sm:size-8 size-4 ml-[-50%] mt-[-50%]"
            onClick={onRemove}
          >
            <Cross2Icon color="white" className="size-2" aria-hidden="true" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  )
}

// function isFileWithPreview(file: File): file is File & { preview: string } {
//   return 'preview' in file && typeof file.preview === 'string'
// }
