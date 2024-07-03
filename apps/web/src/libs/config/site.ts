// import type { FooterItem, MainNavItem } from "@/types"

// import { productCategories } from "@/config/products"
// import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: 'https://twitter.com/toan5ks1',
  github: 'https://github.com/toan5ks1',
  githubAccount: 'https://github.com/toan5ks1',
  discord: 'https://discord.com/users/toan5ks1',
  calDotCom: 'https://cal.com/toan5ks1',
}

export const siteConfig = {
  name: 'Wearify',
  description:
    'An open source e-commerce skateshop build with everything new in Next.js.',
  url: 'https://skateshop.sadmn.com',
  ogImage: 'https://skateshop.sadmn.com/opengraph-image.png',
  links,
  mainNav: [
    {
      title: 'Lobby',
      items: [
        {
          title: 'Products',
          href: '/products',
          description: 'All the products we have to offer.',
          items: [],
        },
        {
          title: 'Build a Board',
          href: '/build-a-board',
          description: 'Build your own custom skateboard.',
          items: [],
        },
        {
          title: 'Blog',
          href: '/blog',
          description: 'Read our latest blog posts.',
          items: [],
        },
      ],
    },
  ],
  footerNav: [
    {
      title: 'Credits',
      items: [
        {
          title: 'OneStopShop',
          href: 'https://onestopshop.jackblatch.com',
          external: true,
        },
        {
          title: 'Acme Corp',
          href: 'https://acme-corp.jumr.dev',
          external: true,
        },
        {
          title: 'craft.mxkaske.dev',
          href: 'https://craft.mxkaske.dev',
          external: true,
        },
        {
          title: 'Taxonomy',
          href: 'https://tx.shadcn.com/',
          external: true,
        },
        {
          title: 'shadcn/ui',
          href: 'https://ui.shadcn.com',
          external: true,
        },
      ],
    },
    {
      title: 'Help',
      items: [
        {
          title: 'About',
          href: '/pages/about',
          external: false,
        },
        {
          title: 'Contact',
          href: '/pages/Contact',
          external: false,
        },
        {
          title: 'Terms',
          href: '/pages/terms',
          external: false,
        },
        {
          title: 'Privacy',
          href: '/pages/privacy',
          external: false,
        },
      ],
    },
    {
      title: 'Social',
      items: [
        {
          title: 'Twitter',
          href: links.twitter,
          external: true,
        },
        {
          title: 'GitHub',
          href: links.githubAccount,
          external: true,
        },
        {
          title: 'Discord',
          href: links.discord,
          external: true,
        },
        {
          title: 'cal.com',
          href: links.calDotCom,
          external: true,
        },
      ],
    },
    {
      title: 'Lofi',
      items: [
        {
          title: 'beats to study to',
          href: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
          external: true,
        },
        {
          title: 'beats to chill to',
          href: 'https://www.youtube.com/watch?v=rUxyKA_-grg',
          external: true,
        },
        {
          title: 'a fresh start',
          href: 'https://www.youtube.com/watch?v=rwionZbOryo',
          external: true,
        },
        {
          title: 'coffee to go',
          href: 'https://www.youtube.com/watch?v=2gliGzb2_1I',
          external: true,
        },
      ],
    },
  ],
}
