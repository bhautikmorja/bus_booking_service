import { BusBooking } from '../entities';

export const busBookingProviders = [
  {
    provide: 'BUS_BOOKING_REPOSITORY',
    useValue: BusBooking,
  },
];
