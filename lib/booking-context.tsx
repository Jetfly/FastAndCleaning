'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  BookingState,
  VehicleType,
  PackageType,
  TimeSlot,
  CustomerInfo,
} from '@/types/booking';

interface BookingContextType {
  booking: BookingState;
  setVehicleType: (type: VehicleType) => void;
  setPackage: (pkg: PackageType) => void;
  toggleOptionalService: (serviceId: string) => void;
  setDateTime: (date: Date, time: TimeSlot) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  calculateTotalPrice: () => number;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingState: BookingState = {
  step: 1,
  vehicleType: null,
  package: null,
  optionalServices: [],
  selectedDate: null,
  selectedTime: null,
  customerInfo: null,
  totalPrice: 0,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialBookingState);

  const setVehicleType = (type: VehicleType) => {
    setBooking((prev) => ({ ...prev, vehicleType: type }));
  };

  const setPackage = (pkg: PackageType) => {
    setBooking((prev) => ({ ...prev, package: pkg }));
  };

  const toggleOptionalService = (serviceId: string) => {
    setBooking((prev) => ({
      ...prev,
      optionalServices: prev.optionalServices.includes(serviceId)
        ? prev.optionalServices.filter((id) => id !== serviceId)
        : [...prev.optionalServices, serviceId],
    }));
  };

  const setDateTime = (date: Date, time: TimeSlot) => {
    setBooking((prev) => ({ ...prev, selectedDate: date, selectedTime: time }));
  };

  const setCustomerInfo = (info: CustomerInfo) => {
    setBooking((prev) => ({ ...prev, customerInfo: info }));
  };

  const nextStep = () => {
    setBooking((prev) => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  };

  const prevStep = () => {
    setBooking((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  };

  const goToStep = (step: number) => {
    setBooking((prev) => ({ ...prev, step: Math.max(1, Math.min(step, 5)) }));
  };

  const calculateTotalPrice = (): number => {
    let total = 0;

    // Base price from vehicle and package
    if (booking.vehicleType && booking.package) {
      const priceMap = {
        express: { citadine: 25, berline: 30, suv: 35, monospace: 38 },
        confort: { citadine: 45, berline: 55, suv: 65, monospace: 70 },
        premium: { citadine: 70, berline: 85, suv: 100, monospace: 110 },
      };
      total = priceMap[booking.package][booking.vehicleType];
    }

    // Add optional services
    const optionalPrices: { [key: string]: number } = {
      'motor-cleaning': 15,
      'ceramic-treatment': 40,
      'odor-removal': 20,
      'headlight-polish': 25,
      'rim-protection': 15,
    };

    booking.optionalServices.forEach((serviceId) => {
      total += optionalPrices[serviceId] || 0;
    });

    return total;
  };

  const resetBooking = () => {
    setBooking(initialBookingState);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setVehicleType,
        setPackage,
        toggleOptionalService,
        setDateTime,
        setCustomerInfo,
        nextStep,
        prevStep,
        goToStep,
        calculateTotalPrice,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
