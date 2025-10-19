# CleanAuto - Landing Page Lavage Auto

Landing page moderne et professionnelle pour un service de lavage automobile à domicile.

## Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **Zod** - Validation de schémas

## Fonctionnalités

### 1. Navigation fixe et responsive
- Menu hamburger sur mobile
- Scroll fluide vers les sections
- Effet de transparence au scroll

### 2. Hero Section
- Image de fond impactante
- Deux boutons CTA (Réserver / Voir tarifs)
- Badges de confiance (7j/7, Écologique, Satisfaction)

### 3. Tunnel de réservation en 5 étapes
- **Étape 1** : Sélection du type de véhicule (Citadine, Berline, SUV, Monospace)
- **Étape 2** : Choix de la formule (Express, Confort, Premium)
- **Étape 3** : Services optionnels (Nettoyage moteur, Traitement céramique, etc.)
- **Étape 4** : Calendrier interactif avec créneaux horaires
- **Étape 5** : Formulaire client et récapitulatif de commande

### 4. Sections de contenu
- **Avantages** : 4 cards présentant les points forts du service
- **Tarifs** : Tableau de prix dynamique par véhicule et formule
- **Témoignages** : Carousel avec avis clients 5 étoiles
- **Footer** : Contact, liens rapides, newsletter, réseaux sociaux

## Architecture du projet

```
C:\FastAndCleaning\
├── app/
│   ├── globals.css          # Styles globaux
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Page d'accueil
├── components/
│   ├── BookingTunnel/
│   │   ├── BookingModal.tsx    # Modal du tunnel de réservation
│   │   ├── Stepper.tsx         # Indicateur de progression
│   │   ├── Step1VehicleType.tsx
│   │   ├── Step2Package.tsx
│   │   ├── Step3Options.tsx
│   │   ├── Step4Calendar.tsx
│   │   └── Step5Summary.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Advantages.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   └── Footer.tsx
├── lib/
│   ├── booking-context.tsx  # Context React pour l'état de réservation
│   └── data.ts              # Données mockées
├── types/
│   └── booking.ts           # Types TypeScript
└── tailwind.config.ts       # Configuration Tailwind
```

## Installation

1. Cloner le projet
```bash
cd C:\FastAndCleaning
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer le serveur de développement
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000)

## Build de production

```bash
npm run build
npm start
```

## Déploiement sur Vercel

Le projet est prêt à être déployé sur Vercel :

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Cliquez sur "Deploy"

Ou utilisez la CLI Vercel :
```bash
npm i -g vercel
vercel
```

## Design System

### Palette de couleurs
- **Primaire** : `#2563EB` (Bleu professionnel)
- **Secondaire** : `#10B981` (Vert écologique)
- **Accent** : `#F59E0B` (Orange pour CTA)
- **Dark** : `#1F2937` (Texte sombre)
- **Light** : `#F9FAFB` (Background)

### Typographie
- **Font** : Inter (Google Fonts)
- **Titres** : font-bold, text-4xl à text-6xl
- **Corps** : font-normal, text-base à text-lg

### Animations
- Fade-in au scroll
- Hover effects sur boutons et cards
- Transitions fluides (via Tailwind)

## Gestion d'état

Le système de réservation utilise **React Context API** avec :
- State management centralisé
- Calcul dynamique des prix
- Navigation entre les étapes du tunnel
- Persistance des données durant la session

## Responsive Design

- **Mobile-first approach**
- Breakpoints Tailwind : `sm`, `md`, `lg`, `xl`
- Menu hamburger sur mobile
- Grilles adaptatives
- Images optimisées avec Next.js Image

## Accessibilité

- Labels ARIA
- Navigation au clavier
- Contraste de couleurs WCAG AA
- Focus visible sur les éléments interactifs

## Performance

- Images optimisées avec Next.js Image
- Lazy loading des composants
- Static Site Generation (SSG)
- Code splitting automatique

## Prochaines étapes

- Intégration backend (API de réservation)
- Système de paiement (Stripe)
- Envoi d'emails de confirmation
- Espace client
- Dashboard admin
- Intégration Google Maps pour l'adresse

## Support

Pour toute question, contactez : contact@cleanauto.fr

## Licence

Ce projet est sous licence MIT.
