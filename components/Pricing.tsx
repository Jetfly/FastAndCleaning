'use client';

import { pricingTable } from '@/lib/data';

interface PricingProps {
  onBookingClick: () => void;
}

export default function Pricing({ onBookingClick }: PricingProps) {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nos tarifs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des prix transparents et adaptés à chaque type de véhicule
          </p>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto mb-12">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-primary to-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-bold text-white">
                      Type de véhicule
                    </th>
                    <th className="px-6 py-4 text-center text-lg font-bold text-white">
                      Express
                      <div className="text-xs font-normal mt-1 opacity-90">
                        30 min
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-lg font-bold text-white bg-accent/20">
                      Confort
                      <div className="text-xs font-normal mt-1 opacity-90">
                        1h ⭐
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-lg font-bold text-white">
                      Premium
                      <div className="text-xs font-normal mt-1 opacity-90">
                        1h30
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pricingTable.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-5 whitespace-nowrap font-semibold text-dark">
                        {row.vehicleType}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <span className="text-2xl font-bold text-primary">
                          {row.express}€
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center bg-accent/5">
                        <span className="text-2xl font-bold text-accent">
                          {row.confort}€
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <span className="text-2xl font-bold text-secondary">
                          {row.premium}€
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="font-bold text-lg mb-2">Moyens de paiement</h3>
            <p className="text-gray-600 text-sm">
              Carte bancaire, espèces, chèque ou virement
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="font-bold text-lg mb-2">Sans engagement</h3>
            <p className="text-gray-600 text-sm">
              Aucun abonnement requis, payez uniquement ce que vous consommez
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-bold text-lg mb-2">Annulation gratuite</h3>
            <p className="text-gray-600 text-sm">
              Annulation possible jusqu'à 24h avant le rendez-vous
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onBookingClick}
            className="bg-accent hover:bg-accent/90 text-white px-12 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Réserver maintenant
          </button>
        </div>
      </div>
    </section>
  );
}
