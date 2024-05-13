'use client'
import * as React from 'react'

import { Button } from '@ui/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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

export function IdVerifyDrawer() {
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

function TurtorialDecription({ children }: React.PropsWithChildren) {
  return (
    <div className="flex">
      <div className="mr-1.5 pt-[6px]">
        <Icons.checked
          className="h-3.5 w-3.5 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <DialogDescription className="text-lg">{children}</DialogDescription>
    </div>
  )
}

function ProfileForm({ className }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      <TurtorialDecription>
        Quý khách vui lòng chuẩn bị CCCD hoặc CCCD gắn chip
      </TurtorialDecription>
      <TurtorialDecription>
        Sử dụng giấy tờ gốc đã đăng ký tại NCB, nguyên vẹn và còn hiệu lực
      </TurtorialDecription>
      <TurtorialDecription>
        Không sử dụng giấy tờ giả mạo, không chính chủ
      </TurtorialDecription>
      <TurtorialDecription>
        Không chụp lại từ bản photocopy, từ ảnh chụp hoặc bất kỳ bản sao chép
        nào khác
      </TurtorialDecription>
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
          <DialogDescription>Không chụp mất góc</DialogDescription>
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
          <DialogDescription>Không chụp loá sáng</DialogDescription>
        </div>
      </div>
    </div>
  )
}
