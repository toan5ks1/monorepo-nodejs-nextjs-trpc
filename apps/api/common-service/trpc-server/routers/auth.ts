import { isAuthed } from '../middleware'
import { publicProcedure, router } from '../trpc'
import {
  schemaRegister,
  schemaSignIn,
  schemaUser,
  schemaRegisterWithProvider,
  schemaEmail,
  schemaEmailToken,
  schemaToken,
} from '@foundation-trpc/forms/src/validations/auth'

import { prisma } from '@foundation-trpc/db'
import { TRPCError } from '@trpc/server'
import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { AuthProviderType } from '@foundation-trpc/db/types'
import { sign } from 'jsonwebtoken'
import { sendVerificationEmail } from './email'
import { type Result } from '../types'

export const authRoutes = router({
  users: publicProcedure.use(isAuthed('admin')).query(() => {
    return prisma.user.findMany()
  }),
  user: publicProcedure.input(schemaUser).query(({ input: { uid }, ctx }) => {
    return prisma.user.findUnique({ where: { uid } })
  }),
  signIn: publicProcedure
    .input(schemaSignIn)
    .mutation(async ({ input: { email, password } }) => {
      const credentials = await prisma.credentials.findUnique({
        where: { email },
        include: { user: true },
      })

      if (!credentials) {
        throw new Error('Invalid email or password')
      }

      if (!bcrypt.compareSync(password, credentials.passwordHash)) {
        throw new Error('Invalid email or password')
      }

      const token = sign(
        { uid: credentials.uid },
        process.env.NEXTAUTH_SECRET || '',
      )

      return {
        user: credentials.user,
        token,
      }
    }),
  registerWithCredentials: publicProcedure
    .input(schemaRegister)
    .mutation(async ({ input: { email, password, image, name } }) => {
      const existingUser = await prisma.credentials.findUnique({
        where: { email },
      })
      if (existingUser) {
        throw new TRPCError({
          message: 'User already exists with this email.',
          code: 'BAD_REQUEST',
        })
      }

      const salt = bcrypt.genSaltSync()
      const passwordHash = bcrypt.hashSync(password, salt)

      const user = await prisma.user.create({
        data: {
          uid: uuid(),
          name,
          image,
          Credentials: { create: { email, passwordHash } },
          AuthProvider: { create: { type: AuthProviderType.CREDENTIALS } },
        },
      })

      const token = sign({ uid: user.uid }, process.env.NEXTAUTH_SECRET || '')
      return { user, token }
    }),
  registerWithProvider: publicProcedure
    .input(schemaRegisterWithProvider)
    .mutation(async ({ input }) => {
      const { type, uid, image, name } = input
      const user = await prisma.user.create({
        data: {
          uid,
          image,
          name,
          AuthProvider: {
            create: {
              type,
            },
          },
        },
      })
      const token = sign({ uid: user.uid }, process.env.NEXTAUTH_SECRET || '')
      return { user, token }
    }),
  generatePasswordResetToken: publicProcedure
    .input(schemaEmail)
    .mutation(async ({ input: { email } }) => {
      const token = uuid()
      const expires = new Date(new Date().getTime() + 3600 * 1000)

      const existingToken = await prisma.passwordResetToken.findFirst({
        where: { email },
      })

      if (existingToken) {
        await prisma.passwordResetToken.delete({
          where: { id: existingToken.id },
        })
      }

      return await prisma.passwordResetToken.create({
        data: {
          email,
          token,
          expires,
        },
      })
    }),
  generateVerificationToken: publicProcedure
    .input(schemaEmail)
    .mutation(async ({ input: { email } }) => {
      const existingToken = await prisma.verificationToken.findFirst({
        where: { email },
      })

      if (existingToken) {
        await prisma.verificationToken.delete({
          where: {
            id: existingToken.id,
          },
        })
      }

      const verificationToken = await prisma.verificationToken.create({
        data: {
          email,
          token: uuid(),
          expires: new Date(new Date().getTime() + 3600 * 1000),
        },
      })

      return await sendVerificationEmail({
        email: verificationToken.email,
        token: verificationToken.token,
      })
    }),
  verifyEmailToken: publicProcedure
    .input(schemaToken)
    .query(async ({ input: { token } }) => {
      try {
        const existingToken = await prisma.verificationToken.findUnique({
          where: { token },
        })

        if (!existingToken) {
          return { success: false, message: 'Token does not exist!' }
        }

        const hasExpired = new Date(existingToken.expires) < new Date()

        if (hasExpired) {
          return { success: false, message: 'Token has expired!' }
        }

        await prisma.credentials.update({
          where: { email: existingToken.email },
          data: {
            emailVerified: new Date(),
            email: existingToken.email,
          },
        })

        await prisma.verificationToken.delete({
          where: { id: existingToken.id },
        })
      } catch (err) {
        console.log(err)
        return { success: false, message: 'Something went wrong!' }
      }

      return { success: true, message: 'Email is verified!' }
    }),
})
