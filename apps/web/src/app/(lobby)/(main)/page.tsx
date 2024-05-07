import * as React from 'react'
import Link from 'next/link'
import { Balancer } from 'react-wrap-balancer'
import { Icons } from '@ui/components/molecules/icons'

import { Button, buttonVariants } from '@ui/components/ui/button'
import { ProductCard } from '@ui/components/cards/product-card'
import { StoreCard } from '@ui/components/cards/store-card'
import { Shell } from '@ui/components/shells/shell'
import { ProductCardSkeleton } from '@ui/components/skeletons/product-card-skeleton'
import { StoreCardSkeleton } from '@ui/components/skeletons/store-card-skeleton'
import { cn } from '@ui/lib/utils'

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
          Maybank investment bank Vietnam
        </Balancer>
        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Open trading account
        </Balancer>
      </section>
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6 pt-8 md:pt-10 lg:pt-12"
      >
        <div className="flex items-center gap-4 flex-col">
          <div className="max-w-[58rem] flex-1 space-y-1">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              Tôi là công dân Việt Nam
            </h2>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              <Icons.checked className="ml-2 h-4 w-4" aria-hidden="true" />
              <span>Quý khách vui lòng chuẩn bị CCCD hoặc CCCD gắn chip</span>
            </Balancer>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              <Icons.checked className="ml-2 h-4 w-4" aria-hidden="true" />
              Sử dụng giấy tờ gốc đã đăng ký tại NCB, nguyên vẹn và còn hiệu lực
            </Balancer>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              <Icons.checked className="ml-2 h-4 w-4" aria-hidden="true" />
              Không sử dụng giấy tờ giả mạo, không chính chủ
            </Balancer>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              <Icons.checked className="ml-2 h-4 w-4" aria-hidden="true" />
              Không chụp lại từ bản photocopy, từ ảnh chụp hoặc bất kỳ bản sao
              chép nào khác
            </Balancer>
          </div>
          <Button className="space-y-8 rounded-3xl">
            <Link
              href="/products"
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: 'mx-auto flex w-fit',
                }),
              )}
            >
              Bắt đầu ngay
              <span className="sr-only">Bắt đầu ngay</span>
            </Link>
          </Button>
        </div>
        {/* <Button className="space-y-8 rounded-3xl sm:hidden">
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'mx-auto flex w-fit',
              }),
            )}
          >
            Bắt đầu ngay
            <span className="sr-only">Bắt đầu ngay</span>
          </Link>
        </Button> */}
      </section>
      <section
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        className="space-y-6 py-8 md:py-10 lg:py-12"
      >
        <div className="flex items-center gap-4">
          <div className="max-w-[58rem] flex-1 space-y-1">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              I am foreigner
            </h2>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Click for more details
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
            View details
            <Icons.arrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
        <div className="space-y-8">
          <Link
            href="/stores"
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'mx-auto flex w-fit sm:hidden',
              }),
            )}
          >
            View details
            <Icons.arrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      </section>
    </Shell>
  )
}
