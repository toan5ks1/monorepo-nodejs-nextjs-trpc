import { publicProcedure, router } from '../trpc'

import { prisma } from '@pod-platform/db-identity'

export const resourceRoutes = router({
  categories: publicProcedure.query(async () => {
    return await prisma.categories.findMany()
  }),
})
