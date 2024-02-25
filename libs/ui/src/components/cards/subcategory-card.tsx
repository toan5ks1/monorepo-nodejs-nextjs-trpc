import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Subcategory } from "@/db/schema"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { AspectRatio } from "../ui/aspect-ratio"

interface SubcategoryCardProps {
  category: string
  subcategory: Subcategory
}

export function SubcategoryCard({
  category,
  subcategory,
}: SubcategoryCardProps) {
  return (
    <Card className="h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-muted/50">
      <Link
        key={subcategory.slug}
        href={`/categories/${category}/${subcategory.slug}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={3 / 2}>
            <Image
              src={
                subcategory.images?.url ?? "/images/product-placeholder.webp"
              }
              alt={subcategory.images?.name ?? subcategory.title}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          </AspectRatio>
          <span className="sr-only">{subcategory.title}</span>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <CardTitle className="line-clamp-1">{subcategory.title}</CardTitle>
        </CardContent>
      </Link>
    </Card>
  )
}
