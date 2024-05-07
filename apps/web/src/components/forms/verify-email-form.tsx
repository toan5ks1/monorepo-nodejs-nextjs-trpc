// 'use client'

// import { useSearchParams } from 'next/navigation'
// import { Button } from '@ui/components/ui/button'
// import Link from 'next/link'
// import { InfoCard } from '@ui/components/cards/info-card'
// import { trpcClient } from '@pod-platform/trpc-client/src/client'
// import { BarLoader } from '@ui/components/loader/bar-loader'

// interface VerifyResult {
//   message: string
//   success: boolean
// }

// export function VerifyEmailForm() {
//   const searchParams = useSearchParams()
//   const token = searchParams.get('token')
//   const { data: verifyResult } = trpcClient.auth.verifyEmailToken.useQuery({
//     token: token ?? '',
//   })

//   // if (verifyResult?.success) {
//   //   setTimeout(() => router.push('/signin'), 2500)
//   // }

//   const renderResult = (result?: VerifyResult) => {
//     switch (result?.success) {
//       case undefined:
//         return <BarLoader width={'100%'} />
//       case true:
//         return (
//           <>
//             <InfoCard type={verifyResult!} />
//             {/* <span className="bg-background text-muted-foreground">
//               Redirecting to login...
//             </span>
//             <BarLoader width={'100%'} cssOverride={{ marginTop: 8 }} /> */}
//           </>
//         )
//       case false:
//         return <InfoCard type={verifyResult!} />
//       default:
//         return
//     }
//   }

//   return (
//     <div className="flex flex-col items-left w-full justify-center space-y-8">
//       {!token ? (
//         <InfoCard
//           type={{ success: true, message: 'Confirmation email sent!' }}
//         />
//       ) : (
//         renderResult(verifyResult)
//       )}

//       <Button className="w-full">
//         <Link aria-label="Back to login" href="/signin">
//           Back to login
//         </Link>
//       </Button>
//     </div>
//   )
// }
