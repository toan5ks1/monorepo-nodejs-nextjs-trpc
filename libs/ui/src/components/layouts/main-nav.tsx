'use client'

import * as React from 'react'
import Link from 'next/link'

import { siteConfig } from '@foundation-trpc/util/config/site'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import { Icons } from '../icons'
import { cn, slugify } from '../../util'
import { MenuItem } from '../../util/types'

interface MainNavProps {
  categories?: MenuItem[]
}

export function MainNav({ categories }: MainNavProps) {
  const mainNav = {
    title: 'Catalog',
    items: categories,
  }

  const lobby = siteConfig.mainNav[0]!

  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {/* Catalog */}
          <NavigationMenuItem key={mainNav.title}>
            <NavigationMenuTrigger className="h-auto capitalize">
              {mainNav.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent asChild>
              <ul className="flex w-screen gap-3 p-4">
                {mainNav.items?.map((item) => (
                  <li key={item.title}>
                    <ul className="flex w-[180px] flex-col gap-3">
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={`/categories/${item.slug}`}
                      />
                      {item.childItems?.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          title={subItem.title}
                          href={`/categories/${item.slug}/${slugify(
                            subItem.title,
                          )}`}
                        />
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* Lobby */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-auto">
              {lobby.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Icons.logo className="h-6 w-6" aria-hidden="true" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {siteConfig.name}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {siteConfig.description}
                      </p>
                      <span className="sr-only">Home</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {lobby.items.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

const ListSubItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListSubItem.displayName = 'ListSubItem'
