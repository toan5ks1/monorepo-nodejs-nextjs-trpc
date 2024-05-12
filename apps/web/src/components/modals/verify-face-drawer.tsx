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
} from '@ui/components/ui/drawer'
import { Icons } from '@ui/components/molecules/icons'
import Image from 'next/image'

import { useMediaQuery } from '@pod-platform/util/hooks/use-media-query'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@ui/components/ui/dialog'

import { cn } from '@ui/lib/utils'

export function FaceVerifyDrawer() {
  const [open, setOpen] = React.useState(true)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              Lưu ý
            </DialogTitle>
            <DialogDescription>
              Vui lòng để điện thoại ở ngang tầm mắt để khuôn mặt vào trọn trong
              khung hình
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
          <DrawerDescription>
            Vui lòng để điện thoại ở ngang tầm mắt để khuôn mặt vào trọn trong
            khung hình
          </DrawerDescription>
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

function ProfileForm({ className }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-2 space-y-4', className)}>
      <div className="flex w-full gap-8">
        <div className="relative flex-1 text-center space-y-1">
          <Image
            src="/images/id-turtorial-1.webp"
            alt="Hướng dẫn chụp hình p1"
            className="object-cover rounded-sm"
            sizes="full"
            height={965}
            width={1600}
            priority
          />
          <DialogDescription>Môi trường đủ sáng</DialogDescription>
        </div>
        <div className="relative flex-1 text-center space-y-1">
          <Image
            src="/images/id-turtorial-2.webp"
            alt="Hướng dẫn chụp hình p2"
            className="object-cover rounded-sm"
            sizes="full"
            height={965}
            width={1600}
            priority
          />
          <DialogDescription>Không đeo kính râm</DialogDescription>
        </div>
        <div className="relative flex-1 text-center space-y-1">
          <Image
            src="/images/id-turtorial-2.webp"
            alt="Hướng dẫn chụp hình p2"
            className="object-cover rounded-sm"
            sizes="full"
            height={965}
            width={1600}
            priority
          />
          <DialogDescription>Không đeo khẩu trang</DialogDescription>
        </div>
      </div>
    </div>
  )
}
