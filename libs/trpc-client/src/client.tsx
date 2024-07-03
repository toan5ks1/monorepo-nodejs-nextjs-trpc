'use client'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { AppRouter } from '@pod-platform/trpc-fastify/src/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import SuperJSON from 'superjson'

export const trpcClient = createTRPCReact<AppRouter>()

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpc] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_API_URL + '/trpc',
          async headers() {
            const token = await fetch(
              process.env.NEXT_PUBLIC_APP_URL + '/api/auth/token',
            ).then((res) => res.json())
            return {
              authorization: `Bearer ${token}`,
            }
          },
        }),
      ],
      transformer: SuperJSON,
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <trpcClient.Provider client={trpc} queryClient={queryClient}>
        {children}
      </trpcClient.Provider>
    </QueryClientProvider>
  )
}
