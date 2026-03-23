'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { count } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/accessoires', label: 'Accessoires' },
    { href: '/plateaux', label: 'Plateaux' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-orange-500 font-bold text-xl">
            <Truck className="w-7 h-7" />
            <span>EKO <span className="text-white">Dépanneuse</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-orange-500 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/panier" className="relative p-2 text-gray-300 hover:text-orange-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-300 hover:text-orange-500"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-orange-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
