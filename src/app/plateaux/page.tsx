import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Plateaux pour dépanneuse — EKO Dépanneuse',
}

export default async function PlateauxPage() {
  const plateaux = await prisma.category.findUnique({
    where: { slug: 'plateaux' },
    include: {
      children: {
        include: { _count: { select: { products: true } } },
      },
    },
  })

  const subCategories = plateaux?.children || []

  const subcatImages: Record<string, string> = {
    'plateaux-a-emporter': 'https://placehold.co/600x400/111/ff6600?text=Plateaux+a+emporter',
    'plateaux-montage': 'https://placehold.co/600x400/111/ff6600?text=Plateaux+Montage',
    'plateaux-speciaux': 'https://placehold.co/600x400/111/ff6600?text=Plateaux+Speciaux',
  }

  const subcatDesc: Record<string, string> = {
    'plateaux-a-emporter': 'Plateaux amovibles pour transport rapide. Compatible tous châssis.',
    'plateaux-montage': 'Plateaux fixes de montage pour installation permanente sur camion.',
    'plateaux-speciaux': 'Solutions sur mesure pour besoins spécifiques et véhicules atypiques.',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Plateaux pour dépanneuse</h1>
        <p className="text-gray-400">Découvrez nos 3 gammes de plateaux professionnels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subCategories.map(sub => (
          <Link
            key={sub.id}
            href={`/plateaux/${sub.slug}`}
            className="group bg-gray-900 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={subcatImages[sub.slug] || 'https://placehold.co/600x400/111/ff6600?text=Plateau'}
                alt={sub.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {sub.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">
                {subcatDesc[sub.slug] || ''}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-orange-500 text-sm font-medium">
                  {sub._count.products} produit{sub._count.products !== 1 ? 's' : ''}
                </span>
                <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
