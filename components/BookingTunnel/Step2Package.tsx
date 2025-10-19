'use client';

import { packages } from '@/lib/data';
import { PackageType } from '@/types/booking';
import { useBooking } from '@/lib/booking-context';
import { Check, Clock } from 'lucide-react';

export default function Step2Package() {
  const { booking, setPackage, nextStep, prevStep } = useBooking();

  const handleSelect = (pkg: PackageType) => {
    setPackage(pkg);
  };

  const getPrice = (pkg: PackageType) => {
    if (!booking.vehicleType) return 0;
    const selectedPackage = packages.find((p) => p.id === pkg);
    return selectedPackage?.priceMultiplier[booking.vehicleType] || 0;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        Choisissez votre formule de nettoyage
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Sélectionnez la formule adaptée à vos besoins
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {packages.map((pkg) => {
          const isSelected = booking.package === pkg.id;
          const price = getPrice(pkg.id);
          const isRecommended = pkg.id === 'confort';

          return (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border-2 transition-all ${
                isSelected
                  ? 'border-primary shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-primary hover:shadow-xl'
              } ${isRecommended ? 'md:scale-110 z-10' : ''}`}
            >
              {isRecommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ Recommandé
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Clock size={18} />
                  <span>{pkg.duration}</span>
                </div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {price}€
                  </div>
                  <p className="text-sm text-gray-500">
                    pour votre {booking.vehicleType}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(pkg.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-dark hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? 'Sélectionné' : 'Choisir cette formule'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          className="text-gray-600 hover:text-primary font-semibold"
        >
          ← Retour
        </button>
        <button
          onClick={nextStep}
          disabled={!booking.package}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            booking.package
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}
