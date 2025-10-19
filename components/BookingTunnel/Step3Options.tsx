'use client';

import { optionalServices } from '@/lib/data';
import { useBooking } from '@/lib/booking-context';
import { Check } from 'lucide-react';

export default function Step3Options() {
  const { booking, toggleOptionalService, nextStep, prevStep, calculateTotalPrice } = useBooking();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        Services optionnels
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Personnalisez votre prestation avec nos options supplémentaires
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {optionalServices.map((service) => {
          const isSelected = booking.optionalServices.includes(service.id);

          return (
            <button
              key={service.id}
              onClick={() => toggleOptionalService(service.id)}
              className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-secondary bg-secondary/5 shadow-lg'
                  : 'border-gray-200 hover:border-secondary hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{service.icon}</div>
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-secondary border-secondary'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-secondary">
                  +{service.price}€
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Total Price Display */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Prix total estimé</p>
            <p className="text-sm text-gray-500">
              {booking.optionalServices.length > 0 &&
                `Formule + ${booking.optionalServices.length} option(s)`}
            </p>
          </div>
          <div className="text-4xl font-bold text-primary">
            {calculateTotalPrice()}€
          </div>
        </div>
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
          className="px-8 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-all"
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}
