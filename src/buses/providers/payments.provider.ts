import { Payment } from '../entities';

export const paymentProviders = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useValue: Payment,
  },
];
