# Eko Dépanneuse — MVP E-commerce

## Structure du site

### Navigation
- Accueil (hero + catégories)
- Accessoires pour dépanneuse (catalogue e-commerce)
- Plateaux pour dépanneuse
  - Plateaux à emporter
  - Plateaux montage
  - (3ème type à définir)
- Panier
- Contact

### Stack technique
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- Stripe Checkout (paiement)
- Dark mode (style similaire à accessoire-camion.fr)
- Responsive mobile-first
- Français

### Fonctionnalités MVP
1. **Page d'accueil** : Hero banner, 2 grandes catégories cliquables (Accessoires / Plateaux), produits populaires
2. **Catalogue produits** : Grille de produits avec photo, nom, prix, prix barré optionnel. Filtres par catégorie
3. **Page produit** : Galerie photos, description, variantes (taille, couleur), bouton ajouter au panier
4. **Panier** : Sidebar ou page, modifier quantités, total, bouton checkout
5. **Checkout Stripe** : Redirection Stripe Checkout
6. **Page catégorie Plateaux** : 3 sous-catégories avec images
7. **Admin basique** : Page /admin protégée par mot de passe pour ajouter/modifier/supprimer des produits (CRUD)
8. **Footer** : Contact, mentions légales, réseaux sociaux
9. **Formulaire de contact** : Nom, email, message, téléphone

### Design
- Style inspiré de accessoire-camion.fr
- Couleurs : fond sombre, accents orange/jaune (univers camion/dépanneuse)
- Cards produits avec hover effect
- Police moderne sans-serif

### Base de données (Prisma)
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  price       Float
  comparePrice Float?
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  images      ProductImage[]
  variants    Variant[]
  featured    Boolean  @default(false)
  available   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Category {
  id       String    @id @default(cuid())
  name     String
  slug     String    @unique
  parentId String?
  parent   Category? @relation("SubCategories", fields: [parentId], references: [id])
  children Category[] @relation("SubCategories")
  products Product[]
  image    String?
}

model ProductImage {
  id        String  @id @default(cuid())
  url       String
  alt       String?
  position  Int     @default(0)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId String
}

model Variant {
  id        String  @id @default(cuid())
  name      String
  value     String
  price     Float?
  available Boolean @default(true)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId String
}

model Order {
  id             String      @id @default(cuid())
  email          String
  phone          String?
  total          Float
  status         String      @default("pending")
  stripeSessionId String?    @unique
  items          OrderItem[]
  createdAt      DateTime    @default(now())
}

model OrderItem {
  id        String @id @default(cuid())
  name      String
  price     Float
  quantity  Int
  order     Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)
  orderId   String
}
```

### Seed data
Créer quelques produits de démo dans chaque catégorie :
- Accessoires : 5-6 produits (sangles, feux, gyrophares, coffres)
- Plateaux à emporter : 2-3 produits
- Plateaux montage : 2-3 produits

### Déploiement
- Dockerfile multi-stage (builder + runner)
- Port 3000
- Variables d'env : DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY, ADMIN_PASSWORD, NEXTAUTH_SECRET

### Pages
- `/` — Accueil
- `/accessoires` — Catalogue accessoires
- `/plateaux` — Page plateaux (3 sous-catégories)
- `/plateaux/[slug]` — Sous-catégorie plateau
- `/produit/[slug]` — Page produit détaillée
- `/panier` — Panier
- `/contact` — Formulaire contact
- `/admin` — CRUD produits (protégé)
- `/api/checkout` — Stripe checkout session
- `/api/webhooks/stripe` — Webhook Stripe
