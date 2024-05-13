'use client'

import * as React from 'react'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@ui/components/ui/input-otp'

import { Button, buttonVariants } from '@ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@ui/components/ui/dialog'
import { Input } from '@ui/components/ui/input'
import { Label } from '@ui/components/ui/label'
import { Icons } from '@ui/components/molecules/icons'
import { FormTypeOtp, useFormOtp } from '@pod-platform/forms/src/form'

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/components/ui/form'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useGlobalState } from '../providers/global-context'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useCountdown from '@pod-platform/util/hooks/use-countdown'
import { otpExpireTime } from '@/utils/config'

// const FormSchema = z.object({
//   pin: z.string().min(6, {
//     message: "Your one-time password must be 6 characters.",
//   }),
// })

interface OtpDialogProps {
  isOpen: boolean
  setIsOpenOtp: Dispatch<SetStateAction<boolean>>
  shouldStart: boolean
}

export function OtpDialog({
  isOpen,
  setIsOpenOtp,
  shouldStart,
}: OtpDialogProps) {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     pin: "",
  //   },
  // })
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const { userInfo, setUserInfo } = useGlobalState()
  const { countdown, startCountdown, restartCountdown } = useCountdown(10)

  useEffect(() => {
    if (shouldStart) {
      startCountdown()
    }
  }, [shouldStart])

  const form = useFormOtp()
  // function onSubmit(data: FormTypeSignIn) {
  //   toast.message('Verify successfully!', {
  //     description: 'We sent you a verification link.',
  //   })
  // }

  const resendOtp = () => {
    startTransition(async () => {
      try {
        // Call api resend here

        if (true) {
          toast.message('Successfully!', {
            description: 'We sent you an OTP code.',
          })
          restartCountdown()
        } else {
          toast('error')
        }
      } catch (err) {
        // catchError(err)
      }
    })
  }

  async function onSubmit({ otp }: FormTypeOtp) {
    startTransition(async () => {
      try {
        if (true) {
          toast.message('Check your email', {
            description: 'We sent you a verification link.',
          })
          router.push('/verify-id')
          // router.refresh()
        } else {
          toast('error')
        }
      } catch (err) {
        // catchError(err)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenOtp}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Xác thực OTP</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Vui lòng nhập mã OTP vừa được gửi về số điện thoại{' '}
            <span className="text-primary">{userInfo.phone}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 flex flex-col items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 flex flex-col items-center"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center w-full">
                <Button
                  variant="link"
                  onClick={resendOtp}
                  disabled={countdown > 0}
                >
                  <Icons.reload className="mx-2 h-4 w-4" aria-hidden="true" />
                  Lấy lại mã
                </Button>
                {countdown ? (
                  <DialogDescription className="text-center">
                    Hết hạn sau: {countdown}s
                  </DialogDescription>
                ) : (
                  <></>
                )}
              </div>
              <DialogFooter className="flex items-center justify-between flex-row space-x-2 w-full">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    Huỷ bỏ
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  Xác nhận
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
