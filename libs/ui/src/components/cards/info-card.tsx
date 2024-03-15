import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import { cn } from '../../util'

export interface InfoCardType {
  success: boolean
  message: string
}

interface InfoCardProps {
  type: InfoCardType
}

export const InfoCard = ({ type }: InfoCardProps) => {
  return (
    <div
      className={cn(
        ' p-3 rounded-md flex items-center gap-x-2 text-sm ',
        type.success
          ? 'bg-emerald-500/15 text-emerald-500'
          : 'bg-destructive/15 text-destructive',
      )}
    >
      {type.success ? (
        <CheckCircledIcon className="h-4 w-4" />
      ) : (
        <ExclamationTriangleIcon className="h-4 w-4" />
      )}
      <p>{type.message ?? 'Something went wrong!'}</p>
    </div>
  )
}
