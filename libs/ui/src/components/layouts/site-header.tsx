// import Link from 'next/link'

import { dashboardConfig } from '@pod-platform/util/config/dashboard'
import { siteConfig } from '@pod-platform/util/config/site'

import { MainNav } from '../layouts/main-nav'
import { MobileNav } from '../layouts/mobile-nav'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button size="sm">
              {/* <Link href="/signin"> */}
              Liên hệ
              <span className="sr-only">Liên hệ</span>
              {/* </Link> */}
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
