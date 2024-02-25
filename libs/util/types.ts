import { ReactNode } from 'react'
import { ZodIssue, z } from '@foundation-trpc/forms/src'
import { cartLineItemSchema } from '@foundation-trpc/forms/src/schemas'

export type Role = 'admin' | 'manager'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}

export type ValidationError = Partial<Pick<ZodIssue, 'path' | 'message'>>

export interface FormState {
  data?: string | null
  error?: ValidationError[] | null
}

export interface MenuItem {
  title: string
  slug: string
  childItems?: MenuItem[]
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: any
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type CartLineItem = z.infer<typeof cartLineItemSchema>
