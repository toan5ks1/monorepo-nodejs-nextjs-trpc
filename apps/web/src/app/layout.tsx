import type { Metadata, Viewport } from 'next'

import '@pod-platform/ui/src/index.css'

import { siteConfig } from '@pod-platform/util/config/site'
import { fontHeading, GeistMono, GeistSans } from '@ui/lib/utils/fonts'
import { Toaster } from '@ui/components/ui/toaster'
import { Analytics } from '@ui/components/molecules/analytics'
import { ThemeProvider } from '@ui/components/molecules/providers'
import { SessionProvider } from '@ui/components/molecules/session-provider'
import { GlobalStateProvider } from '@/components/providers/global-context'
import { cn } from '@ui/lib/utils'
import { env } from '@/env.mjs'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'nextjs',
    'trading',
    'account',
    'register',
    'maybank',
    'securities',
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
            GeistSans.variable,
            GeistMono.variable,
            fontHeading.variable,
          )}
        >
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <GlobalStateProvider>{children}</GlobalStateProvider>
              <Analytics />
            </ThemeProvider>
          </SessionProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}
