import { z } from 'zod'
import { AreaType, AuthProviderType } from '.'

export const schemaRegister = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
  name: z.string().optional(),
  image: z.string().optional(),
})

export const schemaSignIn = schemaRegister.pick({
  email: true,
  password: true,
})

export const schemaEmail = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export const schemaUser = z.object({
  uid: z.string(),
})

export const schemaRegisterWithProvider = z.object({
  uid: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  type: z.nativeEnum(AuthProviderType),
})

export const schemaSendMail = z.object({
  receiver: z.string(),
  subject: z.string(),
  content: z.string(),
})

export const schemaToken = z.object({
  token: z.string(),
})

export const schemaEmailToken = z.object({
  token: z.string(),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Verification code must be 6 characters long',
    })
    .max(6),
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

export const sideSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  description: z.string().optional(),
  subcategoryId: z.number().optional().nullable().default(null),
  mockup: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, 'Must be a File')
    .optional()
    .nullable()
    .default(null),
  areaType: z.enum(AreaType).default('image'),
  areaImage: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, 'Must be a File')
    .optional()
    .nullable()
    .default(null),
  dimension: z
    .array(
      z
        .object({
          w: z.number().nullable().default(0),
          h: z.number().nullable().default(0),
          x: z.number().nullable().default(0),
          y: z.number().nullable().default(0),
        })
        .refine(
          (val) => (!val.w || val.w >= 0) && (!val.h || val.h >= 0),
          'Width & height must be greater than or equal to 0',
        ),
    )
    .optional()
    .nullable()
    .default(null),
})

export const categorySchema = z.object({
  title: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  description: z.string().optional(),
  slug: z.string().optional(),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, 'Must be an array of File')
    .optional()
    .nullable()
    .default(null),
  sides: z.array(sideSchema),
})
