'use client';

import { useState } from 'react';
import { useBooking } from '@/lib/booking-context';
import { vehicleOptions, packages, optionalServices } from '@/lib/data';
import { Check, Mail, Phone, MapPin, User, Car } from 'lucide-react';

export default function Step5Summary() {
  const { booking, prevStep, calculateTotalPrice, resetBooking } = useBooking();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    licensePlate: '',
    instructions: '',
    acceptTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const vehicle = vehicleOptions.find((v) => v.id === booking.vehicleType);
  const selectedPackage = packages.find((p) => p.id === booking.package);
  const selectedOptions = optionalServices.filter((s) =>
    booking.optionalServices.includes(s.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Veuillez accepter les conditions générales de vente');
      return;
    }
    // Here you would normally send the data to your backend
    console.log('Booking submitted:', { ...booking, customerInfo: formData });
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-secondary" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Réservation confirmée !</h2>
        <p className="text-xl text-gray-600 mb-8">
          Merci {formData.fullName} ! Nous avons bien reçu votre demande de réservation.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-bold text-lg mb-4">Récapitulatif</h3>
          <div className="space-y-2 text-gray-700">
            <p>
              📧 Un email de confirmation a été envoyé à{' '}
              <strong>{formData.email}</strong>
            </p>
            <p>
              📅 Rendez-vous le{' '}
              <strong>
                {booking.selectedDate?.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </strong>{' '}
              à <strong>{booking.selectedTime}</strong>
            </p>
            <p>
              📍 Adresse : <strong>{formData.address}</strong>
            </p>
            <p>
              💰 Montant total : <strong>{calculateTotalPrice()}€</strong>
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            resetBooking();
            setIsSubmitted(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              address: '',
              licensePlate: '',
              instructions: '',
              acceptTerms: false,
            });
          }}
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
        >
          Nouvelle réservation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        Récapitulatif et informations
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Vérifiez votre commande et renseignez vos coordonnées
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-6">Votre commande</h3>

            <div className="space-y-4">
              {/* Vehicle */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold">Véhicule</p>
                  <p className="text-sm text-gray-600">{vehicle?.name}</p>
                </div>
                <span className="text-lg font-bold">{vehicle?.icon}</span>
              </div>

              {/* Package */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold">Formule</p>
                  <p className="text-sm text-gray-600">
                    {selectedPackage?.name} ({selectedPackage?.duration})
                  </p>
                </div>
                <span className="text-lg font-bold text-primary">
                  {selectedPackage &&
                    booking.vehicleType &&
                    selectedPackage.priceMultiplier[booking.vehicleType]}
                  €
                </span>
              </div>

              {/* Options */}
              {selectedOptions.length > 0 && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="font-semibold mb-2">Options</p>
                  {selectedOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className="flex justify-between items-center text-sm mb-1"
                    >
                      <span className="text-gray-600">• {opt.name}</span>
                      <span className="font-semibold">+{opt.price}€</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Date & Time */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold">Date et heure</p>
                  <p className="text-sm text-gray-600">
                    {booking.selectedDate?.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                  <p className="text-sm text-gray-600">{booking.selectedTime}</p>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2">
                <p className="text-xl font-bold">Total</p>
                <p className="text-3xl font-bold text-primary">
                  {calculateTotalPrice()}€
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6">Vos coordonnées</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nom complet *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Jean Dupont"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Téléphone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Adresse complète *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="12 Rue de la Paix, 75001 Paris"
                />
              </div>
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Immatriculation *
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent uppercase"
                  placeholder="AB-123-CD"
                />
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Instructions particulières
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Code d'accès, emplacement du véhicule, etc."
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
              <label className="text-sm text-gray-700">
                J'accepte les{' '}
                <a href="#" className="text-primary font-semibold underline">
                  conditions générales de vente
                </a>{' '}
                et la{' '}
                <a href="#" className="text-primary font-semibold underline">
                  politique de confidentialité
                </a>
                *
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                ← Retour
              </button>
              <button
                type="submit"
                className="flex-1 bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all"
              >
                Confirmer la réservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
