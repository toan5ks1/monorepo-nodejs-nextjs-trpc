import NextAuth from 'next-auth'
import { authOptions } from '@pod-platform/network/src/auth/authOptions'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
