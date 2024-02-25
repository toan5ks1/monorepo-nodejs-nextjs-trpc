'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { emailSchema } from './schemas'

export type InputNewsletterForm = z.infer<typeof emailSchema>

export const useFormNewsletter = () =>
  useForm<InputNewsletterForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })
