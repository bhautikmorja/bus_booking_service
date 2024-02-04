import { Bus, BusSchedules } from '../entities';

export const busSchedulesProviders = [
  {
    provide: 'BUS_SCHEDULES_REPOSITORY',
    useValue: BusSchedules,
  },
];
