import Link from 'next/link'
import { Truck, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-orange-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xl mb-4">
              <Truck className="w-7 h-7" />
              <span>EKO <span className="text-white">Dépanneuse</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Spécialiste des équipements pour dépanneuses et véhicules de dépannage professionnels.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: '/accessoires', label: 'Accessoires' },
                { href: '/plateaux', label: 'Plateaux' },
                { href: '/contact', label: 'Contact' },
                { href: '/admin', label: 'Admin' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>contact@eko-depanneuse.fr</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Zone Industrielle, 75000 Paris</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} EKO Dépanneuse. Tous droits réservés.</p>
          <p className="mt-1">
            <Link href="/mentions-legales" className="hover:text-orange-500 transition-colors">Mentions légales</Link>
            {' · '}
            <Link href="/cgv" className="hover:text-orange-500 transition-colors">CGV</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
