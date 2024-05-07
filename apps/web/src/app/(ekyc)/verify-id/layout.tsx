import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ProtectedAuthLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getServerSession()

  if (user) {
    redirect('/')
  }

  return <>{children}</>
}
