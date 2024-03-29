// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import '@foundation-trpc/ui/src/index.css'
// import { Provider } from '@foundation-trpc/trpc-client/src/Provider'
// import { SessionProvider } from '@cmp/molecules/SessionProvider'
// import { Container } from '@cmp/atoms/container'
// import { Navbar } from '@cmp/organisms/Navbar'
// import { Toaster } from '@cmp/molecules/Toaster/Toaster'

// export const dynamic = !(process.env.NODE_ENV === 'production')
//   ? 'force-dynamic'
//   : 'auto'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <SessionProvider>
//           <Provider>
//             <Toaster />
//             <Navbar />
//             <Container>{children}</Container>
//           </Provider>
//         </SessionProvider>
//       </body>
//     </html>
//   )
// }

import type { Metadata, Viewport } from 'next'

import '@foundation-trpc/ui/src/index.css'

import { siteConfig } from '@foundation-trpc/util/config/site'
import {
  fontHeading,
  fontMono,
  fontSans,
} from '@foundation-trpc/ui/src/util/fonts'
import { Toaster } from '@cmp/ui/toaster'
import { Analytics } from '@cmp/analytics'
import { ThemeProvider } from '@cmp/providers'
import { Provider } from '@foundation-trpc/trpc-client/src/Provider'
import { SessionProvider } from '@cmp/molecules/SessionProvider'
import { cn } from '@foundation-trpc/ui/src/util'
import { env } from '@web/src/env.mjs'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'nextjs',
    'react',
    'react server components',
    'skateshop',
    'skateboarding',
    'kickflip',
  ],
  authors: [
    {
      name: 'toan5ks1',
      url: 'https://www.github.com/toan5ks1',
    },
  ],
  creator: 'toan5ks1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@toan5ks1',
  },
  icons: {
    icon: '/icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
            fontMono.variable,
            fontHeading.variable,
          )}
        >
          <SessionProvider>
            <Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Analytics />
              </ThemeProvider>
            </Provider>
          </SessionProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}
