import { SiteHeader } from '@ui/components/layouts/site-header'

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children, modal }: LobyLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="hidden sm:block">
        <SiteHeader />
      </div>
      <main className="flex flex-1 justify-center">
        {children}
        {modal}
      </main>
    </div>
  )
}
