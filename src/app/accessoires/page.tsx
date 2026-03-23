import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Accessoires pour dépanneuse — EKO Dépanneuse',
}

export default async function AccessoiresPage() {
  const category = await prisma.category.findUnique({
    where: { slug: 'accessoires' },
  })

  const products = await prisma.product.findMany({
    where: {
      available: true,
      ...(category ? { categoryId: category.id } : {}),
    },
    include: {
      images: { orderBy: { position: 'asc' }, take: 1 },
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Accessoires pour dépanneuse</h1>
        <p className="text-gray-400">
          {products.length} produit{products.length !== 1 ? 's' : ''} — Sangles, gyrophares, coffres, éclairage et plus
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          Aucun produit disponible pour le moment.
        </div>
      )}
    </div>
  )
}
