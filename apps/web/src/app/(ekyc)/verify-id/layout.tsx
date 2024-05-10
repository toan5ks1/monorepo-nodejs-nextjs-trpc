import { SiteFooter } from '@ui/components/layouts/site-footer'
import { SiteHeader } from '@ui/components/layouts/site-header'
import { getAuth } from '@pod-platform/network/src/auth/authOptions'

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children, modal }: LobyLayoutProps) {
  const session = await getAuth()

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="hidden sm:block">
        <SiteHeader user={session?.user} />
      </div>
      <main className="flex flex-1 justify-center">
        {children}
        {modal}
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}
