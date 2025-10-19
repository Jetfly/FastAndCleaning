export type VehicleType = 'citadine' | 'berline' | 'suv' | 'monospace';

export type PackageType = 'express' | 'confort' | 'premium';

export type TimeSlot = '8h-10h' | '10h-12h' | '14h-16h' | '16h-18h';

export interface VehicleOption {
  id: VehicleType;
  name: string;
  description: string;
  basePrice: number;
  icon: string;
}

export interface Package {
  id: PackageType;
  name: string;
  duration: string;
  description: string;
  features: string[];
  priceMultiplier: {
    citadine: number;
    berline: number;
    suv: number;
    monospace: number;
  };
}

export interface OptionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface AvailableSlot {
  date: Date;
  slots: {
    time: TimeSlot;
    available: boolean;
  }[];
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  licensePlate: string;
  instructions?: string;
  acceptTerms: boolean;
}

export interface BookingState {
  step: number;
  vehicleType: VehicleType | null;
  package: PackageType | null;
  optionalServices: string[];
  selectedDate: Date | null;
  selectedTime: TimeSlot | null;
  customerInfo: CustomerInfo | null;
  totalPrice: number;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PricingRow {
  vehicleType: string;
  express: number;
  confort: number;
  premium: number;
}
