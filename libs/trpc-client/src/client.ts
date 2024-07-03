import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@pod-platform/trpc-fastify/src/trpc'

export const trpcClient = createTRPCReact<AppRouter>()
