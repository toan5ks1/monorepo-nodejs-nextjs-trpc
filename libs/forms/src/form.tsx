'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  schemaEmail,
  schemaRegister,
  schemaSignIn,
  verifyEmailSchema,
  checkEmailSchema,
} from './validations/auth'

export type InputNewsletterForm = z.infer<typeof schemaEmail>

export const useFormNewsletter = () =>
  useForm<InputNewsletterForm>({
    resolver: zodResolver(schemaEmail),
    defaultValues: {
      email: '',
    },
  })

export type FormTypeRegister = z.infer<typeof schemaRegister>

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: '',
      password: '',
    },
  })

export type FormTypeSignIn = z.infer<typeof schemaSignIn>

export const useFormSignIn = () =>
  useForm<FormTypeSignIn>({
    resolver: zodResolver(schemaSignIn),
    defaultValues: {
      email: '',
      password: '',
    },
  })

export type FormTypeVerifyEmail = z.infer<typeof verifyEmailSchema>

export const useFormVerifyEmail = () =>
  useForm<FormTypeVerifyEmail>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  })

export type FormTypeResetPassword = z.infer<typeof checkEmailSchema>

export const useFormResetPassword = () =>
  useForm<FormTypeResetPassword>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: '',
    },
  })
