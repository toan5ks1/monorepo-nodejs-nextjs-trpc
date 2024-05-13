import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from '@ui/components/ui/aspect-ratio'
import { ModeToggle } from '@ui/components/layouts/mode-toggle'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/background.jpeg"
          alt="A tiger of maybank"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" />
        <Link
          href="/"
          className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
        >
          <Image
            src="/images/logo-maybank.png"
            alt="A tiger of maybank"
            height={0}
            width={0}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-36 h-auto"
          />
        </Link>
        <div className="absolute bottom-6 z-20 line-clamp-1 left-8 text-sm">
          @2024 Công ty TNHH Chứng khoán Maybank
        </div>
      </AspectRatio>
      <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        {children}
        <div className="absolute right-8 top-4 z-20">
          <ModeToggle />
        </div>
      </main>
    </div>
  )
}
