import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CategoryItem, MenuItem } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
    notation?: Intl.NumberFormatOptions['notation']
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
  }).format(Number(price))
}

export function formatNumber(
  number: number | string,
  options: {
    decimals?: number
    style?: Intl.NumberFormatOptions['style']
    notation?: Intl.NumberFormatOptions['notation']
  } = {},
) {
  const { decimals = 0, style = 'decimal', notation = 'standard' } = options

  return new Intl.NumberFormat('en-US', {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(number))
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  },
) {
  return new Intl.DateTimeFormat('en-US', {
    ...options,
  }).format(new Date(date))
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal',
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`
}

export function formatId(id: number) {
  return `#${id.toString().padStart(4, '0')}`
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function unslugify(str: string) {
  return str.replace(/-/g, ' ')
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  )
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files)
  if (!isArray) return false
  return files.every((file) => file instanceof File)
}

export function isMacOs() {
  if (typeof window === 'undefined') return false

  return window.navigator.userAgent.includes('Mac')
}

export function generateMenuTree(
  categories: CategoryItem[],
  parentId: number | null,
): MenuItem[] {
  const menuItems: MenuItem[] = []

  for (const category of categories) {
    if (category.parentId === parentId) {
      const menuItem: MenuItem = {
        title: category.title,
        slug: category.slug,
      }

      const childItems = generateMenuTree(categories, category.id)
      if (childItems.length > 0) {
        menuItem.childItems = childItems
      }

      menuItems.push(menuItem)
    }
  }

  return menuItems
}
