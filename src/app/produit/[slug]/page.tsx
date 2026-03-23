import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: 'asc' } },
      variants: true,
      category: { include: { parent: true } },
    },
  })

  if (!product || !product.available) return notFound()

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  const mainImage = product.images[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
        <ChevronRight className="w-4 h-4" />
        {product.category.parent && (
          <>
            <Link href={`/${product.category.parent.slug}`} className="hover:text-orange-500 transition-colors">
              {product.category.parent.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
        <Link
          href={`/${product.category.parent?.slug || product.category.slug}${product.category.parent ? `/${product.category.slug}` : ''}`}
          className="hover:text-orange-500 transition-colors"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
            {mainImage ? (
              <Image src={mainImage.url} alt={mainImage.alt || product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">Pas d&apos;image</div>
            )}
            {discount && (
              <span className="absolute top-4 left-4 bg-orange-500 text-black text-sm font-bold px-3 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {product.images.slice(1, 5).map((img, i) => (
                <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
                  <Image src={img.url} alt={img.alt || `${product.name} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-orange-500">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-gray-500 text-lg line-through">{formatPrice(product.comparePrice)}</span>
            )}
            {discount && (
              <span className="bg-orange-500/10 text-orange-400 text-sm px-2 py-1 rounded">
                Économisez {discount}%
              </span>
            )}
          </div>

          {product.description && (
            <div className="prose prose-invert prose-sm max-w-none mb-6">
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              {Array.from(new Set(product.variants.map(v => v.name))).map(variantName => (
                <div key={variantName} className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">{variantName}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.filter(v => v.name === variantName).map(variant => (
                      <button
                        key={variant.id}
                        className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                          variant.available
                            ? 'border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-400'
                            : 'border-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                        }`}
                        disabled={!variant.available}
                      >
                        {variant.value}
                        {variant.price && variant.price !== product.price && (
                          <span className="ml-1 text-orange-500">({formatPrice(variant.price)})</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <AddToCartButton
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: mainImage?.url || '',
            }}
            className="py-3 text-base"
          />

          {/* Trust signals */}
          <div className="mt-8 space-y-3 border-t border-gray-800 pt-6">
            {[
              { icon: Truck, text: 'Livraison rapide 48h en France' },
              { icon: Shield, text: 'Produit certifié CE — Garantie 2 ans' },
              { icon: RotateCcw, text: 'Retours sous 30 jours' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-400">
                <Icon className="w-4 h-4 text-orange-500 shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
