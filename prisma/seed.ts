import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Categories
  const accessories = await prisma.category.upsert({
    where: { slug: 'accessoires' },
    update: {},
    create: {
      name: 'Accessoires',
      slug: 'accessoires',
      image: '/images/categories/accessoires.jpg',
    },
  })

  const plateaux = await prisma.category.upsert({
    where: { slug: 'plateaux' },
    update: {},
    create: {
      name: 'Plateaux',
      slug: 'plateaux',
      image: '/images/categories/plateaux.jpg',
    },
  })

  const plateauxEmporter = await prisma.category.upsert({
    where: { slug: 'plateaux-a-emporter' },
    update: {},
    create: {
      name: 'Plateaux à emporter',
      slug: 'plateaux-a-emporter',
      parentId: plateaux.id,
      image: '/images/categories/plateaux-emporter.jpg',
    },
  })

  const plateauxMontage = await prisma.category.upsert({
    where: { slug: 'plateaux-montage' },
    update: {},
    create: {
      name: 'Plateaux montage',
      slug: 'plateaux-montage',
      parentId: plateaux.id,
      image: '/images/categories/plateaux-montage.jpg',
    },
  })

  const plateauxSpeciaux = await prisma.category.upsert({
    where: { slug: 'plateaux-speciaux' },
    update: {},
    create: {
      name: 'Plateaux spéciaux',
      slug: 'plateaux-speciaux',
      parentId: plateaux.id,
      image: '/images/categories/plateaux-speciaux.jpg',
    },
  })

  // Accessory products
  const accessoryProducts = [
    {
      name: "Sangles d'arrimage 5T - Lot de 4",
      slug: 'sangles-arrimage-5t-lot-4',
      description: "Sangles d'arrimage professionnelles 5 tonnes. Certifiées CE. Idéales pour le transport de véhicules lourds. Longueur 6m, largeur 50mm.",
      price: 89.99,
      comparePrice: 119.99,
      featured: true,
      categoryId: accessories.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Sangles+5T', alt: "Sangles d'arrimage 5T", position: 0 }],
      variants: [
        { name: 'Longueur', value: '4m', available: true },
        { name: 'Longueur', value: '6m', available: true },
        { name: 'Longueur', value: '8m', available: true },
      ],
    },
    {
      name: 'Gyrophare LED Magnétique',
      slug: 'gyrophare-led-magnetique',
      description: 'Gyrophare LED haute visibilité. Base magnétique puissante. 12V. Homologué route. Câble 3m avec allume-cigare.',
      price: 64.90,
      comparePrice: null,
      featured: true,
      categoryId: accessories.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Gyrophare+LED', alt: 'Gyrophare LED', position: 0 }],
      variants: [
        { name: 'Couleur', value: 'Orange', available: true },
        { name: 'Couleur', value: 'Bleu', available: true },
      ],
    },
    {
      name: 'Feux de détresse triangles - Lot de 3',
      slug: 'feux-detresse-triangles-lot-3',
      description: 'Triangles de signalisation réfléchissants. Conformes aux normes européennes. Hauteur visible 30m. Obligatoire en France.',
      price: 34.50,
      comparePrice: 45.00,
      featured: false,
      categoryId: accessories.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Triangles', alt: 'Triangles de détresse', position: 0 }],
      variants: [],
    },
    {
      name: 'Coffre de rangement aluminium 800L',
      slug: 'coffre-rangement-aluminium-800l',
      description: 'Coffre aluminium robuste pour dépanneuse. 800 litres de rangement. Fermeture à clé. Résistant aux intempéries. Dimensions: 120x60x60cm.',
      price: 299.00,
      comparePrice: 380.00,
      featured: true,
      categoryId: accessories.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Coffre+800L', alt: 'Coffre aluminium 800L', position: 0 }],
      variants: [
        { name: 'Taille', value: '600L', price: 249.00, available: true },
        { name: 'Taille', value: '800L', price: 299.00, available: true },
        { name: 'Taille', value: '1000L', price: 349.00, available: true },
      ],
    },
    {
      name: 'Kit éclairage LED barre 120cm',
      slug: 'kit-eclairage-led-barre-120cm',
      description: 'Barre LED 120cm pour dépanneuse. 180W. Étanche IP67. Faisceau combiné (spot + flood). Fixation universelle.',
      price: 149.90,
      comparePrice: 199.90,
      featured: false,
      categoryId: accessories.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Barre+LED', alt: 'Barre LED 120cm', position: 0 }],
      variants: [
        { name: 'Taille', value: '60cm', price: 89.90, available: true },
        { name: 'Taille', value: '120cm', price: 149.90, available: true },
      ],
    },
    {
      name: 'Crochet de remorquage rotatif 5T',
      slug: 'crochet-remorquage-rotatif-5t',
      description: 'Crochet de remorquage rotatif à 360°. Capacité 5 tonnes. Acier traité. Embout universel. Livré avec axe et goupille de sécurité.',
      price: 79.00,
      comparePrice: null,
      featured: false,
      categoryId: accessories.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Crochet+5T', alt: 'Crochet rotatif 5T', position: 0 }],
      variants: [],
    },
  ]

  for (const product of accessoryProducts) {
    const { images, variants, ...productData } = product
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...productData,
        images: { create: images },
        variants: { create: variants },
      },
    })
  }

  // Plateaux à emporter
  const emporterProducts = [
    {
      name: 'Plateau à emporter 5T - 4.5m',
      slug: 'plateau-emporter-5t-4m5',
      description: 'Plateau de chargement amovible pour dépanneuse. Capacité 5 tonnes. Longueur 4.5m. Largeur 2.10m. Acier galvanisé. Rampes intégrées.',
      price: 2490.00,
      comparePrice: 2890.00,
      featured: true,
      categoryId: plateauxEmporter.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Plateau+5T+4.5m', alt: 'Plateau à emporter 5T', position: 0 }],
      variants: [
        { name: 'Longueur', value: '4.5m', price: 2490.00, available: true },
        { name: 'Longueur', value: '5m', price: 2790.00, available: true },
      ],
    },
    {
      name: 'Plateau à emporter 3.5T - 4m',
      slug: 'plateau-emporter-3t5-4m',
      description: 'Plateau léger pour dépanneuse VL. Capacité 3.5 tonnes. Longueur 4m. Aluminium renforcé. Poids : 380kg. Idéal pour VL et utilitaires.',
      price: 1890.00,
      comparePrice: null,
      featured: false,
      categoryId: plateauxEmporter.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Plateau+3.5T+4m', alt: 'Plateau à emporter 3.5T', position: 0 }],
      variants: [],
    },
    {
      name: 'Plateau à emporter 8T - 5.5m',
      slug: 'plateau-emporter-8t-5m5',
      description: 'Plateau lourd pour PL et engins de chantier. Capacité 8 tonnes. Longueur 5.5m. Largeur 2.30m. Rampes repliables hydrauliques.',
      price: 4290.00,
      comparePrice: 4990.00,
      featured: false,
      categoryId: plateauxEmporter.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Plateau+8T+5.5m', alt: 'Plateau à emporter 8T', position: 0 }],
      variants: [],
    },
  ]

  for (const product of emporterProducts) {
    const { images, variants, ...productData } = product
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...productData,
        images: { create: images },
        variants: { create: variants },
      },
    })
  }

  // Plateaux montage
  const montageProducts = [
    {
      name: 'Plateau montage fixe 5T - 4.2m',
      slug: 'plateau-montage-fixe-5t-4m2',
      description: 'Plateau fixe de montage pour dépanneuse professionnelle. Capacité 5T. Longueur 4.2m. Montage sur châssis camion. Glissières réglables.',
      price: 3190.00,
      comparePrice: 3690.00,
      featured: true,
      categoryId: plateauxMontage.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Plateau+Montage+5T', alt: 'Plateau montage 5T', position: 0 }],
      variants: [],
    },
    {
      name: 'Plateau montage coulissant 7T',
      slug: 'plateau-montage-coulissant-7t',
      description: "Plateau montage avec système coulissant. Capacité 7T. Déport hydraulique 800mm. Compatible châssis 19T. Installation comprise sur devis.",
      price: 5490.00,
      comparePrice: null,
      featured: false,
      categoryId: plateauxMontage.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Plateau+Coulissant+7T', alt: 'Plateau coulissant 7T', position: 0 }],
      variants: [],
    },
    {
      name: 'Plateau montage basculant 3.5T',
      slug: 'plateau-montage-basculant-3t5',
      description: 'Plateau basculant pour utilitaire. Capacité 3.5T. Angle de bascule 12°. Commande depuis la cabine. Idéal pour les VL et fourgons.',
      price: 2890.00,
      comparePrice: 3290.00,
      featured: false,
      categoryId: plateauxMontage.id,
      images: [{ url: 'https://placehold.co/600x600/1a1a1a/ff6600?text=Plateau+Basculant+3.5T', alt: 'Plateau basculant 3.5T', position: 0 }],
      variants: [],
    },
  ]

  for (const product of montageProducts) {
    const { images, variants, ...productData } = product
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...productData,
        images: { create: images },
        variants: { create: variants },
      },
    })
  }

  console.log('Seed terminé avec succès!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
