'use client';

import { vehicleOptions } from '@/lib/data';
import { VehicleType } from '@/types/booking';
import { useBooking } from '@/lib/booking-context';

export default function Step1VehicleType() {
  const { booking, setVehicleType, nextStep } = useBooking();

  const handleSelect = (type: VehicleType) => {
    setVehicleType(type);
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        Quel type de véhicule souhaitez-vous faire laver ?
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Sélectionnez le type de véhicule correspondant à votre voiture
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicleOptions.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => handleSelect(vehicle.id)}
            className={`group relative p-8 rounded-2xl border-2 transition-all transform hover:scale-105 hover:shadow-xl ${
              booking.vehicleType === vehicle.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-gray-200 hover:border-primary'
            }`}
          >
            <div className="text-6xl mb-4">{vehicle.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-dark">
              {vehicle.name}
            </h3>
            <p className="text-gray-600 mb-4">{vehicle.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">À partir de</span>
              <span className="text-2xl font-bold text-primary">
                {vehicle.basePrice}€
              </span>
            </div>

            {booking.vehicleType === vehicle.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
