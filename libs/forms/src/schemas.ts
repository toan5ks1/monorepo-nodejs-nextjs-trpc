import { z } from 'zod'
import { AuthProviderType } from '@foundation-trpc/db/types'

export const schemaRegister = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  image: z.string().optional(),
})

export const schemaUser = z.object({
  uid: z.string(),
})

export const schemaSignIn = schemaRegister.pick({
  email: true,
  password: true,
})

export const schemaRegisterWithProvider = z.object({
  uid: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  type: z.nativeEnum(AuthProviderType),
})

export const emailSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export const cartLineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  images: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .optional()
    .nullable(),
  category: z.string().optional().nullable(),
  subcategory: z.string().optional().nullable(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  inventory: z.number().default(0),
  quantity: z.number(),
  storeId: z.number(),
  storeName: z.string().optional().nullable(),
  storeStripeAccountId: z.string().optional().nullable(),
})
