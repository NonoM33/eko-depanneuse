'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function PanierPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Erreur lors du paiement')
      }
    } catch {
      alert('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-700 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Votre panier est vide</h1>
        <p className="text-gray-400 mb-8">Ajoutez des produits pour commencer vos achats</p>
        <Link
          href="/accessoires"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Découvrir nos produits
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Mon panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-800">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/produit/${item.slug}`} className="text-white font-medium hover:text-orange-400 transition-colors line-clamp-2">
                  {item.name}
                </Link>
                {item.variant && (
                  <p className="text-gray-500 text-sm mt-0.5">{item.variant}</p>
                )}
                <p className="text-orange-500 font-bold mt-1">{formatPrice(item.price)}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-gray-400 text-sm">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-500 transition-colors text-sm flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Vider le panier
          </button>
        </div>

        {/* Summary */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold text-white mb-4">Récapitulatif</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-gray-400">
              <span>Sous-total</span>
              <span className="text-white">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Livraison</span>
              <span className="text-green-500">Calculée au checkout</span>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-orange-500 font-bold text-xl">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Chargement...' : (
              <>
                Payer maintenant
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-gray-500 text-xs text-center mt-3">
            Paiement sécurisé par Stripe
          </p>
        </div>
      </div>
    </div>
  )
}
