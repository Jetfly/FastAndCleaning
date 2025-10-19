'use client';

import { useState, useMemo } from 'react';
import { useBooking } from '@/lib/booking-context';
import { TimeSlot } from '@/types/booking';
import { generateAvailableSlots } from '@/lib/data';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function Step4Calendar() {
  const { booking, setDateTime, nextStep, prevStep } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(booking.selectedDate);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(booking.selectedTime);

  const availableSlots = useMemo(() => generateAvailableSlots(), []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const isDateAvailable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date <= today) return false;
    if (date.getDay() === 0) return false; // Skip Sundays

    return availableSlots.some(
      (slot) =>
        slot.date.toDateString() === date.toDateString() &&
        slot.slots.some((s) => s.available)
    );
  };

  const getTimeSlotsForDate = (date: Date) => {
    const slot = availableSlots.find(
      (s) => s.date.toDateString() === date.toDateString()
    );
    return slot?.slots || [];
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: TimeSlot) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setDateTime(selectedDate, selectedTime);
      nextStep();
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        Choisissez votre date et heure
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Sélectionnez un créneau disponible pour votre rendez-vous
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold capitalize">{monthName}</h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
              <div
                key={i}
                className="text-center text-sm font-semibold text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDayOfWeek || 7 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isAvailable = isDateAvailable(day);
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isSelected =
                selectedDate?.toDateString() === date.toDateString();

              return (
                <button
                  key={day}
                  onClick={() => isAvailable && handleDateSelect(day)}
                  disabled={!isAvailable}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-primary text-white'
                      : isAvailable
                      ? 'bg-gray-100 hover:bg-primary/10 text-dark'
                      : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-gray-600">
            <CalendarIcon className="w-5 h-5 flex-shrink-0" />
            <p>
              Disponible du lundi au samedi. Réservation minimum J+1.
            </p>
          </div>
        </div>

        {/* Time slots */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6">Créneaux horaires</h3>

          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <CalendarIcon className="w-16 h-16 mb-4" />
              <p>Sélectionnez d'abord une date</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                {selectedDate.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`w-full p-4 rounded-lg border-2 font-semibold transition-all ${
                    selectedTime === slot.time
                      ? 'border-primary bg-primary text-white'
                      : slot.available
                      ? 'border-gray-200 hover:border-primary hover:bg-primary/5'
                      : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                  {!slot.available && ' (Complet)'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 hover:text-primary font-semibold"
        >
          ← Retour
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            selectedDate && selectedTime
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
