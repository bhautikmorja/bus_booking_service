import { Bus } from '../entities';

export const busProviders = [
  {
    provide: 'BUS_REPOSITORY',
    useValue: Bus,
  },
];
