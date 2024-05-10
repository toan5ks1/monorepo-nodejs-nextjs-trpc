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

// const FormSchema = z.object({
//   pin: z.string().min(6, {
//     message: "Your one-time password must be 6 characters.",
//   }),
// })

interface OtpDialogProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OtpDialog({ children }: OtpDialogProps) {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     pin: "",
  //   },
  // })

  const form = useFormOtp()
  // function onSubmit(data: FormTypeSignIn) {
  //   toast.message('Verify successfully!', {
  //     description: 'We sent you a verification link.',
  //   })
  // }
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  async function onSubmit({ otp }: FormTypeOtp) {
    startTransition(async () => {
      try {
        if (true) {
          console.log(otp)
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Xác thực OTP</DialogTitle>
          <DialogDescription className="text-center">
            Vui lòng nhập mã OTP vừa được gửi về số điện thoại 099***0373
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
                <Button variant="link" className="">
                  Lấy lại mã
                  <Icons.reload className="mx-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <DialogDescription className="text-center">
                  Hết hạn sau: 09s
                </DialogDescription>
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
