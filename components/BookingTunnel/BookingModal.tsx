'use client';

import { useBooking } from '@/lib/booking-context';
import { X } from 'lucide-react';
import Stepper from './Stepper';
import Step1VehicleType from './Step1VehicleType';
import Step2Package from './Step2Package';
import Step3Options from './Step3Options';
import Step4Calendar from './Step4Calendar';
import Step5Summary from './Step5Summary';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = ['Véhicule', 'Formule', 'Options', 'Date & Heure', 'Confirmation'];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { booking } = useBooking();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Stepper */}
          <Stepper currentStep={booking.step} steps={steps} />

          {/* Step Content */}
          <div className="pb-8">
            {booking.step === 1 && <Step1VehicleType />}
            {booking.step === 2 && <Step2Package />}
            {booking.step === 3 && <Step3Options />}
            {booking.step === 4 && <Step4Calendar />}
            {booking.step === 5 && <Step5Summary />}
          </div>
        </div>
      </div>
    </div>
  );
}
