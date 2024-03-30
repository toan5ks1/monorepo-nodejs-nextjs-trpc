import { inferRouterOutputs } from '@trpc/server'
import { router } from '../trpc'
import { resourceRoutes } from './resource'

export const appRouter = router({
  resource: resourceRoutes,
})

export type AppRouter = typeof appRouter
export type AppRouterType = inferRouterOutputs<AppRouter>
