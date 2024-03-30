import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@pod-platform/trpc-server-resource/routers'

export const trpcStatic = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL + '/trpc',
    }),
  ],
})
