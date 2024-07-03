import { inferAsyncReturnType, TRPCError } from '@trpc/server'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { verify } from 'jsonwebtoken'
import { authConfig } from './util/config'

export interface User {
  email: string
  role: 'user' | 'admin'
}

async function decodeAndVerifyJwtToken(token: string): Promise<User> {
  const decoded = verify(token, authConfig.secretKey)
  return decoded as User
}

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
    try {
      const user = await decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1],
      )
      return { req, res, user }
    } catch (err) {
      throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
    }
  }

  return { req, res }
}

export type Context = inferAsyncReturnType<typeof createContext>
