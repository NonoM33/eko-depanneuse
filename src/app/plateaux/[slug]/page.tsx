import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PlateauxSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      products: {
        where: { available: true },
        include: { images: { orderBy: { position: 'asc' }, take: 1 } },
      },
    },
  })

  if (!category || !category.parentId) return notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/plateaux" className="hover:text-orange-500 transition-colors">Plateaux</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{category.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
        <p className="text-gray-400">
          {category.products.length} produit{category.products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {category.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          Aucun produit disponible dans cette catégorie pour le moment.
        </div>
      )}
    </div>
  )
}
