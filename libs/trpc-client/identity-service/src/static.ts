import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@pod-platform/trpc-server-identity/routers'

export const trpcStatic = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL + '/trpc',
    }),
  ],
})
