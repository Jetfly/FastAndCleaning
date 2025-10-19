import {
  VehicleOption,
  Package,
  OptionalService,
  Testimonial,
  PricingRow,
  TimeSlot,
} from '@/types/booking';

export const vehicleOptions: VehicleOption[] = [
  {
    id: 'citadine',
    name: 'Citadine',
    description: 'Ex: Renault Clio, Peugeot 208',
    basePrice: 25,
    icon: '🚗',
  },
  {
    id: 'berline',
    name: 'Berline',
    description: 'Ex: Peugeot 508, Renault Talisman',
    basePrice: 30,
    icon: '🚙',
  },
  {
    id: 'suv',
    name: 'SUV/4x4',
    description: 'Ex: Audi Q5, BMW X3',
    basePrice: 35,
    icon: '🚐',
  },
  {
    id: 'monospace',
    name: 'Monospace/Utilitaire',
    description: 'Ex: Citroën Berlingo, Renault Espace',
    basePrice: 38,
    icon: '🚚',
  },
];

export const packages: Package[] = [
  {
    id: 'express',
    name: 'Express',
    duration: '30 min',
    description: 'Extérieur uniquement',
    features: [
      'Lavage carrosserie',
      'Nettoyage vitres extérieures',
      'Nettoyage jantes',
      'Séchage micro-fibre',
    ],
    priceMultiplier: {
      citadine: 25,
      berline: 30,
      suv: 35,
      monospace: 38,
    },
  },
  {
    id: 'confort',
    name: 'Confort',
    duration: '1h',
    description: 'Extérieur + Intérieur basique',
    features: [
      'Tout Express +',
      'Aspiration complète',
      'Nettoyage plastiques intérieurs',
      'Nettoyage vitres intérieures',
      'Parfum habitacle',
    ],
    priceMultiplier: {
      citadine: 45,
      berline: 55,
      suv: 65,
      monospace: 70,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    duration: '1h30',
    description: 'Nettoyage complet professionnel',
    features: [
      'Tout Confort +',
      'Shampoing sièges et tapis',
      'Rénovation plastiques',
      'Lustrage carrosserie',
      'Traitement anti-pluie pare-brise',
      'Nettoyage coffre',
    ],
    priceMultiplier: {
      citadine: 70,
      berline: 85,
      suv: 100,
      monospace: 110,
    },
  },
];

export const optionalServices: OptionalService[] = [
  {
    id: 'motor-cleaning',
    name: 'Nettoyage moteur',
    description: 'Dégraissage et nettoyage du compartiment moteur',
    price: 15,
    icon: '⚙️',
  },
  {
    id: 'ceramic-treatment',
    name: 'Traitement céramique',
    description: 'Protection longue durée de la carrosserie',
    price: 40,
    icon: '✨',
  },
  {
    id: 'odor-removal',
    name: 'Désodorisation habitacle',
    description: 'Traitement à l\'ozone pour éliminer les odeurs',
    price: 20,
    icon: '🌬️',
  },
  {
    id: 'headlight-polish',
    name: 'Polish phares',
    description: 'Rénovation et polissage des optiques de phares',
    price: 25,
    icon: '💡',
  },
  {
    id: 'rim-protection',
    name: 'Protection jantes',
    description: 'Traitement hydrophobe pour faciliter l\'entretien',
    price: 15,
    icon: '🛞',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie Dubois',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment: 'Service impeccable ! L\'équipe est arrivée à l\'heure et ma voiture n\'a jamais été aussi propre. Je recommande vivement !',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: 'Thomas Martin',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment: 'Très pratique de ne pas avoir à bouger de chez soi. Le résultat est professionnel et les produits écologiques sont un vrai plus.',
    date: '2024-01-10',
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment: 'Excellent rapport qualité/prix. La formule Premium vaut vraiment le coup, l\'intérieur de ma voiture est comme neuf !',
    date: '2024-01-08',
  },
  {
    id: 4,
    name: 'Pierre Leroy',
    avatar: 'https://i.pravatar.cc/150?img=15',
    rating: 4,
    comment: 'Très satisfait du service. Ponctuel, professionnel et efficace. Je vais devenir client régulier !',
    date: '2024-01-05',
  },
  {
    id: 5,
    name: 'Émilie Bernard',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    comment: 'Un service de qualité avec un personnel très sympathique. La réservation en ligne est très simple à utiliser.',
    date: '2024-01-03',
  },
];

export const pricingTable: PricingRow[] = [
  { vehicleType: 'Citadine', express: 25, confort: 45, premium: 70 },
  { vehicleType: 'Berline', express: 30, confort: 55, premium: 85 },
  { vehicleType: 'SUV/4x4', express: 35, confort: 65, premium: 100 },
  { vehicleType: 'Monospace', express: 38, confort: 70, premium: 110 },
];

// Generate available time slots for the next 30 days
export const generateAvailableSlots = (): { date: Date; slots: { time: TimeSlot; available: boolean }[] }[] => {
  const slots: { date: Date; slots: { time: TimeSlot; available: boolean }[] }[] = [];
  const today = new Date();
  const timeSlots: TimeSlot[] = ['8h-10h', '10h-12h', '14h-16h', '16h-18h'];

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays
    if (date.getDay() === 0) continue;

    const daySlots = timeSlots.map((time) => ({
      time,
      // Randomly mark some slots as unavailable (for demo purposes)
      available: Math.random() > 0.3,
    }));

    slots.push({ date, slots: daySlots });
  }

  return slots;
};

export const advantages = [
  {
    icon: '🏠',
    title: 'Service à domicile',
    description: 'On vient chez vous, au bureau ou où vous voulez',
  },
  {
    icon: '🌱',
    title: 'Produits écologiques',
    description: 'Respect de l\'environnement avec des produits biodégradables',
  },
  {
    icon: '👨‍🔧',
    title: 'Professionnels qualifiés',
    description: 'Experts du detailing automobile, formés aux meilleures techniques',
  },
  {
    icon: '💳',
    title: 'Paiement sécurisé',
    description: 'Plusieurs moyens de paiement acceptés en toute sécurité',
  },
];
