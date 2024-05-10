'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'
import { Button, buttonVariants } from '@ui/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/components/ui/form'
import { Input } from '@ui/components/ui/input'
import { Icons } from '@ui/components/molecules/icons'
import { PasswordInput } from '@ui/components/molecules/password-input'
import { FormTypeSignIn, useFormSignIn } from '@pod-platform/forms/src/form'
// import { catchError } from '../../utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { catchError } from '@/utils'

import { Label } from '@ui/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@ui/components/ui/radio-group'
import { OtpDialog } from './otp-form'
import { Checkbox } from '@ui/components/ui/checkbox'

export function SignInForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const form = useFormSignIn()

  async function onSubmit({ email, password }: FormTypeSignIn) {
    startTransition(async () => {
      try {
        // const res = await signIn('credentials', {
        //   email,
        //   password,
        //   redirect: false,
        // })

        if (true) {
          toast('Verify code successfully!')
          router.push('/verify-id')
          router.refresh()
        } else {
          toast('error')
        }
      } catch (err) {
        catchError(err)
      }
    })
  }
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  // type="number"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nhập email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gói dịch vụ quản lý tài khoản</FormLabel>
              <FormControl>
                <RadioGroup defaultValue="0">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="r1" />
                    <Label htmlFor="r1">Khách hàng tự giao dịch</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r3" />
                    <Label htmlFor="r3">Khách hàng có chuyên viên tư vấn</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start space-x-2 my-4">
          <Checkbox id="terms" className="mt-1" />
          <div>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tôi cam kết thông tin cung cấp là chính xác, hợp pháp và hoàn toàn
              chịu trách nhiệm. <br />
            </label>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tôi đồng ý nhận các thông tin từ Maybank gửi đến số điện thoại,
              email, địa chỉ đã đăng ký và cho phép sử dụng hoặc cung cấp các
              thông tin của tôi.
            </label>
          </div>
        </div>
        <OtpDialog>
          <Button type="submit">
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Đăng ký mở tài khoản
            <span className="sr-only">Đăng ký mở tài khoản</span>
          </Button>
        </OtpDialog>
      </form>
    </Form>
  )
}
