import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@pod-platform/trpc-server-resource/routers'

export const trpcClient = createTRPCReact<AppRouter>()
