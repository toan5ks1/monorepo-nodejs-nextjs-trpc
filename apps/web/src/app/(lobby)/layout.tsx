import { SiteFooter } from '@ui/layouts/site-footer'
import { SiteHeader } from '@ui/layouts/site-header'
import { getAuth } from '@pod-platform/network/src/auth/authOptions'

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children, modal }: LobyLayoutProps) {
  const session = await getAuth()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={session?.user} />
      <main className="flex-1">
        {children}
        {modal}
      </main>
      <SiteFooter />
    </div>
  )
}
