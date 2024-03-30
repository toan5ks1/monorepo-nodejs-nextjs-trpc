import { ZodIssue, z } from 'zod'
import {
  cartLineItemSchema,
  schemaSendMail,
  schemaEmailToken,
} from './validations/auth'

export {
  useFormContext,
  Controller,
  useFieldArray,
  useWatch,
} from 'react-hook-form'

export { z } from 'zod'
export { type ZodIssue } from 'zod'

export type CartLineItem = z.infer<typeof cartLineItemSchema>

export type FormTypeSendMail = z.infer<typeof schemaSendMail>

export type FormTypeEmailToken = z.infer<typeof schemaEmailToken>

export type ValidationError = Partial<Pick<ZodIssue, 'path' | 'message'>>

export interface FormState {
  data?: string | null
  error?: ValidationError[] | null
}
export const AreaType = ['image', 'dimension'] as const

export const AuthProviderType = {
  GOOGLE: 'GOOGLE',
  CREDENTIALS: 'CREDENTIALS',
} as const
