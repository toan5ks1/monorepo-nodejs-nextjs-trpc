import { ZodIssue, z } from 'zod'
import { cartLineItemSchema } from './schemas'
export { Categories } from '@foundation-trpc/db/types'

export {
  useFormContext,
  Controller,
  useFieldArray,
  useWatch,
} from 'react-hook-form'

export { z } from 'zod'
export { type ZodIssue } from 'zod'

export type CartLineItem = z.infer<typeof cartLineItemSchema>

export type ValidationError = Partial<Pick<ZodIssue, 'path' | 'message'>>

export interface FormState {
  data?: string | null
  error?: ValidationError[] | null
}
export const AreaType = ['image', 'dimension'] as const
