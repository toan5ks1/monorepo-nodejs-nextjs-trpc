import { publicProcedure, router } from '../trpc'
import { prisma } from '../db/index'

export const resourceRoutes = router({
  categories: publicProcedure.query(async () => {
    return await prisma.categories.findMany()
  }),
})
