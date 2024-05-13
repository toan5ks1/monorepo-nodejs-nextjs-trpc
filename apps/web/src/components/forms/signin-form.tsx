'use client'

import { Button } from '@ui/components/ui/button'
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
import { FormTypeSignIn, useFormSignIn } from '@pod-platform/forms/src/form'
// import { catchError } from '../../utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { catchError } from '@/utils'

import { Label } from '@ui/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@ui/components/ui/radio-group'
import { OtpDialog } from './otp-form'
import { Checkbox } from '@ui/components/ui/checkbox'
import { cn } from '@ui/lib/utils'
import { useGlobalState } from '../providers/global-context'
import { useState, useTransition } from 'react'

export function SignInForm() {
  const router = useRouter()
  const form = useFormSignIn()
  const { setUserInfo } = useGlobalState()

  const [isPending, startTransition] = useTransition()
  const [hasRefCode, setHasRefCode] = useState(false)
  const [isOpenOtp, setIsOpenOtp] = useState(false)
  const [shouldStart, setShouldStart] = useState(false)

  const handleRadioChange = (value: string) => {
    value === 'hasRef' ? setHasRefCode(true) : setHasRefCode(false)
  }

  async function onSubmit({ email, phone, refCode }: FormTypeSignIn) {
    startTransition(async () => {
      try {
        // const res = await signIn('credentials', {
        //   email,
        //   password,
        //   redirect: false,
        // })

        if (true) {
          toast('Verify code successfully!')
          setUserInfo({ phone })
          setIsOpenOtp(true)
          setShouldStart(true)
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  maxLength={16}
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
        <FormItem>
          <FormLabel>Gói dịch vụ quản lý tài khoản</FormLabel>
          <FormControl>
            <RadioGroup defaultValue="free" onValueChange={handleRadioChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="r1" />
                <Label htmlFor="r1">Khách hàng tự giao dịch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hasRef" id="r3" />
                <Label htmlFor="r3">Khách hàng có chuyên viên tư vấn</Label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name="refCode"
          render={({ field }) => (
            <FormItem className={cn(!hasRefCode && 'hidden')}>
              <FormControl>
                <Input type="text" placeholder="Mã giới thiệu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAgree"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2">
              <FormControl>
                <Checkbox
                  id="terms"
                  className="mt-3"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tôi cam kết thông tin cung cấp là chính xác, hợp pháp và hoàn
                  toàn chịu trách nhiệm. <br />
                </label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
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
        <OtpDialog
          isOpen={isOpenOtp}
          setIsOpenOtp={setIsOpenOtp}
          shouldStart={shouldStart}
        />
      </form>
    </Form>
  )
}
