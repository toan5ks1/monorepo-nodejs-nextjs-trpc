import { ReactNode } from 'react'
import { Icons } from '../components/icons'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}

export interface CategoryItem {
  id: number
  title: string
  slug: string
  parentId: number | null
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
  icon?: keyof typeof Icons
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

export type User = {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
} & {
  uid: string
}
