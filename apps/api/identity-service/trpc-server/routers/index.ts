import { inferRouterOutputs } from '@trpc/server'
import { router } from '../trpc'
import { authRoutes } from './auth'
import { resourceRoutes } from './resource'

export const appRouter = router({
  auth: authRoutes,
  resource: resourceRoutes,
})

export type AppRouter = typeof appRouter
export type AppRouterType = inferRouterOutputs<AppRouter>
