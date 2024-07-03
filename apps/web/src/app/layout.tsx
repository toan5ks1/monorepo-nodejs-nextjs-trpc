import type { Metadata, Viewport } from 'next'
import '@pod-platform/ui/src/index.css'

import {
  fontHeading,
  fontMono,
  fontSans,
} from '@pod-platform/ui/src/util/fonts'
import { Toaster } from '@ui/components/ui/toaster'
import { Analytics } from '@ui/components/other/analytics'
import { ThemeProvider } from '@ui/components/other/providers'
import { cn } from '@pod-platform/ui/src/util'
import { env } from '@/env.mjs'
import { siteConfig } from '@/libs/config/site'
import { TRPCReactProvider } from '@pod-platform/trpc-client/src/client'
import { SessionProvider } from '@/components/providers/session-provider'

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
            <TRPCReactProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Analytics />
              </ThemeProvider>
            </TRPCReactProvider>
          </SessionProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}
