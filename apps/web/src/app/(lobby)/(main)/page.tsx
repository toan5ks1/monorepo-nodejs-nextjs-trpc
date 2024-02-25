import * as React from 'react'
import Link from 'next/link'
import { Balancer } from 'react-wrap-balancer'
import { Icons } from '@foundation-trpc/ui/src/components/icons'

import { buttonVariants } from '@foundation-trpc/ui/src/components/ui/button'
import { ProductCard } from '@foundation-trpc/ui/src/components/cards/product-card'
import { StoreCard } from '@foundation-trpc/ui/src/components/cards/store-card'
import { Shell } from '@foundation-trpc/ui/src/components/shells/shell'
import { ProductCardSkeleton } from '@foundation-trpc/ui/src/components/skeletons/product-card-skeleton'
import { StoreCardSkeleton } from '@foundation-trpc/ui/src/components/skeletons/store-card-skeleton'
import { cn } from '@foundation-trpc/ui/src/util'

export default async function IndexPage() {
  return (
    <Shell className="max-w-6xl pt-0 md:pt-0">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-32"
      >
        <Balancer
          as="h1"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          An e-commerce skateshop built with everything new in Next.js
        </Balancer>
        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Buy and sell skateboarding gears from independent brands and stores
          around the world with ease
        </Balancer>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/products" className={cn(buttonVariants())}>
            Buy now
            <span className="sr-only">Buy now</span>
          </Link>
          <Link
            href="/dashboard/stores"
            className={cn(
              buttonVariants({
                variant: 'outline',
              }),
            )}
          >
            Sell now
            <span className="sr-only">Sell now</span>
          </Link>
        </div>
      </section>
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6 pt-8 md:pt-10 lg:pt-12"
      >
        <div className="flex items-center gap-4">
          <div className="max-w-[58rem] flex-1 space-y-1">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              Featured products
            </h2>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore products from around the world
            </Balancer>
          </div>
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'hidden sm:flex',
              }),
            )}
          >
            View all products
            <Icons.arrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">View all products</span>
          </Link>
        </div>
        <div className="space-y-8">
          {/* <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <React.Suspense
              fallback={Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            >
              {someProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </React.Suspense>
          </div> */}
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'mx-auto flex w-fit sm:hidden',
              }),
            )}
          >
            View all products
            <Icons.arrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">View all products</span>
          </Link>
        </div>
      </section>
      <section
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        className="space-y-6 py-8 md:py-10 lg:py-12"
      >
        <div className="flex items-center gap-4">
          <div className="max-w-[58rem] flex-1 space-y-1">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              Featured stores
            </h2>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore stores from around the world
            </Balancer>
          </div>
          <Link
            href="/stores"
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'hidden sm:flex',
              }),
            )}
          >
            View all stores
            <Icons.arrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">View all stores</span>
          </Link>
        </div>
        <div className="space-y-8">
          {/* <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <React.Suspense
              fallback={Array.from({ length: 4 }).map((_, i) => (
                <StoreCardSkeleton key={i} />
              ))}
            >
              {someStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  href={`/products?store_ids=${store.id}`}
                />
              ))}
            </React.Suspense>
          </div> */}
          <Link
            href="/stores"
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'mx-auto flex w-fit sm:hidden',
              }),
            )}
          >
            View all stores
            <Icons.arrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">View all stores</span>
          </Link>
        </div>
      </section>
    </Shell>
  )
}
