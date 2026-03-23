import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import AddToCartButton from './AddToCartButton'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    name: string
    price: number
    comparePrice: number | null
    images: { url: string; alt: string | null }[]
    featured: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0]
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  return (
    <div className="group bg-gray-900 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col">
      <Link href={`/produit/${product.slug}`} className="relative block overflow-hidden aspect-square">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600 text-sm">Pas d&apos;image</span>
          </div>
        )}
        {discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 bg-orange-900/80 text-orange-300 text-xs font-medium px-2 py-1 rounded">
            Populaire
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <Link href={`/produit/${product.slug}`}>
          <h3 className="text-white font-medium text-sm leading-tight hover:text-orange-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-orange-500 font-bold text-lg">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-gray-500 text-sm line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>

        <AddToCartButton
          product={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: image?.url || '',
          }}
        />
      </div>
    </div>
  )
}
