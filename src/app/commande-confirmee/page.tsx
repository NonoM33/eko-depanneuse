'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function OrderConfirmedPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Commande confirmée !</h1>
        <p className="text-gray-400 mb-8">
          Merci pour votre commande. Vous allez recevoir un email de confirmation.
          Notre équipe traitera votre commande sous 24h.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Retour à l&apos;accueil
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
