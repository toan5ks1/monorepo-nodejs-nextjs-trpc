import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@pod-platform/trpc-server-identity/routers'

export const trpcClient = createTRPCReact<AppRouter>()
