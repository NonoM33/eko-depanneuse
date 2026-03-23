'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface Props {
  product: {
    id: string
    slug: string
    name: string
    price: number
    image: string
  }
  variant?: string
  className?: string
}

export default function AddToCartButton({ product, variant, className }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: variant ? `${product.id}-${variant}` : product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      variant,
      slug: product.slug,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
        added
          ? 'bg-green-600 text-white'
          : 'bg-orange-500 hover:bg-orange-600 text-black'
      } ${className}`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          Ajouté !
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Ajouter au panier
        </>
      )}
    </button>
  )
}
