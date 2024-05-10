'use client'
import * as React from 'react'

import { Button } from '@ui/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@ui/components/ui/drawer'
import { Icons } from '@ui/components/molecules/icons'

// export function IdVerifyDrawer() {
//   const [open, setOpen] = React.useState(true)

//   return (
//     <Drawer open={open}>
//       <DrawerContent className="h-2/3">
//         <div className="mx-auto w-full max-w-lg">
//           <DrawerHeader className="text-center">
//             <DrawerTitle className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
//               Lưu ý
//             </DrawerTitle>
//             <DrawerDescription>Vui lòng chuẩn bị sẵn CCCD</DrawerDescription>
//           </DrawerHeader>

//           <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-none sm:gap-y-0 sm:gap-x-4 p-4">
//             <div className="text-muted-foreground flex items-center">
//               <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
//               <span className="leading-normal sm:text-lg ">
//                 Quý khách vui lòng chuẩn bị CCCD hoặc CCCD gắn chip
//               </span>
//             </div>
//             <div className="text-muted-foreground flex items-center">
//               <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
//               <span className="leading-normal sm:text-lg">
//                 Sử dụng giấy tờ gốc đã đăng ký tại NCB, nguyên vẹn và còn hiệu
//                 lực
//               </span>
//             </div>
//             <div className="text-muted-foreground flex items-center">
//               <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
//               <p className="leading-normal sm:text-lg">
//                 Không sử dụng giấy tờ giả mạo, không chính chủ
//               </p>
//             </div>
//             <div className="text-muted-foreground flex items-center">
//               <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
//               <p className="leading-normal sm:text-lg">
//                 Không chụp lại từ bản photocopy, từ ảnh chụp hoặc bất kỳ bản sao
//                 chép nào khác
//               </p>
//             </div>
//           </div>

//           {/* </div> */}
//           <DrawerFooter>
//             <DrawerClose asChild>
//               <Button onClick={() => setOpen(false)}>Tôi đã hiểu</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   )
// }

import { cn } from '@ui/lib/utils'
import { useMediaQuery } from '@pod-platform/util/hooks/use-media-query'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/components/ui/dialog'

import { Input } from '@ui/components/ui/input'
import { Label } from '@ui/components/ui/label'

export function IdVerifyDrawer() {
  const [open, setOpen] = React.useState(true)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              Lưu ý
            </DialogTitle>
            <DialogDescription>
              Vui lòng chuẩn bị sẵn CCCD/CMND
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
            Lưu ý
          </DrawerTitle>
          <DrawerDescription>Vui lòng chuẩn bị sẵn CCCD/CMND</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={() => setOpen(false)}>Tôi đã hiểu</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
  return (
    <div className="flex flex-col gap-4 space-y-4 p-4">
      <div className="text-muted-foreground flex items-center">
        <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
        <span className="leading-normal sm:text-lg ">
          Quý khách vui lòng chuẩn bị CCCD hoặc CCCD gắn chip
        </span>
      </div>
      <div className="text-muted-foreground flex items-center">
        <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
        <span className="leading-normal sm:text-lg">
          Sử dụng giấy tờ gốc đã đăng ký tại NCB, nguyên vẹn và còn hiệu lực
        </span>
      </div>
      <div className="text-muted-foreground flex items-center">
        <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
        <p className="leading-normal sm:text-lg">
          Không sử dụng giấy tờ giả mạo, không chính chủ
        </p>
      </div>
      <div className="text-muted-foreground flex items-center">
        <Icons.checked className="mr-2 mt-1 h-4 w-4" aria-hidden="true" />
        <p className="leading-normal sm:text-lg">
          Không chụp lại từ bản photocopy, từ ảnh chụp hoặc bất kỳ bản sao chép
          nào khác
        </p>
      </div>
    </div>
  )
}
