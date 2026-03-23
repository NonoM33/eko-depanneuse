import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Shield, Truck, Award, Phone } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, available: true },
    include: { images: { orderBy: { position: 'asc' }, take: 1 } },
    take: 4,
  })

  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { _count: { select: { products: true } } },
  })

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-orange-500 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-orange-400 text-sm mb-6">
              <Truck className="w-4 h-4" />
              Équipements professionnels pour dépanneuses
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              L&apos;équipement
              <span className="text-orange-500 block">dépanneuse</span>
              au meilleur prix
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Accessoires, plateaux à emporter et plateaux de montage pour professionnels du dépannage. Qualité garantie, livraison rapide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/accessoires"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Voir les accessoires
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/plateaux"
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-gray-700"
              >
                Découvrir les plateaux
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-black">
            {[
              { value: '500+', label: 'Produits' },
              { value: '2 000+', label: 'Clients satisfaits' },
              { value: '48h', label: 'Livraison express' },
              { value: '5 ans', label: "D'expertise" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Nos catégories</h2>
          <p className="text-gray-400">Trouvez l&apos;équipement adapté à votre activité</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Accessoires',
              description: 'Sangles, gyrophares, coffres, éclairage LED et tout le nécessaire pour équiper votre dépanneuse.',
              href: '/accessoires',
              image: 'https://placehold.co/800x400/111/ff6600?text=Accessoires+Depanneuse',
            },
            {
              title: 'Plateaux',
              description: 'Plateaux à emporter et de montage pour tous types de véhicules. Du VL au PL.',
              href: '/plateaux',
              image: 'https://placehold.co/800x400/111/ff6600?text=Plateaux+Depanneuse',
            },
          ].map(cat => (
            <Link key={cat.href} href={cat.href} className="group relative overflow-hidden rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{cat.title}</h3>
                <p className="text-gray-300 text-sm">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-orange-500 text-sm font-medium mt-2">
                  Explorer <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Produits populaires</h2>
              <p className="text-gray-400">Les plus demandés par nos clients professionnels</p>
            </div>
            <Link href="/accessoires" className="text-orange-500 hover:text-orange-400 flex items-center gap-1 text-sm font-medium">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="bg-gray-900/50 border-y border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Qualité certifiée', desc: 'Tous nos produits sont certifiés CE et conformes aux normes européennes.' },
              { icon: Truck, title: 'Livraison 48h', desc: 'Expédition rapide depuis notre entrepôt. Livraison express disponible.' },
              { icon: Award, title: 'Expertise 5 ans', desc: 'Notre équipe de spécialistes vous conseille pour chaque projet.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Besoin d&apos;un devis personnalisé ?</h2>
          <p className="text-orange-900 mb-6 text-lg">Notre équipe est disponible du lundi au vendredi de 8h à 18h.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-black text-orange-500 font-bold px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  )
}
