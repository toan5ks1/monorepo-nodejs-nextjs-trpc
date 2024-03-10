import { publicProcedure, router } from '../trpc'

import { prisma } from '@foundation-trpc/db'

export const resourceRoutes = router({
  categories: publicProcedure.query(async () => {
    return await prisma.categories.findMany()
  }),
})
