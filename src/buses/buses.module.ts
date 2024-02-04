import { Module } from '@nestjs/common';
import { BusController, BusSchedulesController } from './controllers';
import {
  busProviders,
  busSchedulesProviders,
  paymentProviders,
} from './providers';
import {
  BusBookingService,
  BusSchedulesService,
  BusService,
  PaymentService,
} from './services';
import { BusBookingController } from './controllers/bus-booking.controller';
import { busBookingProviders } from './providers/bus-bookings.provider';
import { PaymentController } from './controllers/payment.controller';
import { RazorpayModule } from 'nestjs-razorpay';

import * as dotenv from 'dotenv';
import { userProviders } from 'src/users/user.provider';
import { UserService } from 'src/users/user.service';

dotenv.config();

@Module({
  controllers: [
    BusController,
    BusSchedulesController,
    BusBookingController,
    PaymentController,
  ],
  imports: [
    RazorpayModule.forRoot({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    }),
  ],
  providers: [
    BusService,
    BusSchedulesService,
    BusBookingService,
    PaymentService,
    UserService,
    ...busProviders,
    ...busSchedulesProviders,
    ...busBookingProviders,
    ...paymentProviders,
    ...userProviders,
  ],
  exports: [BusService, BusSchedulesService, BusBookingService, PaymentService],
})
export class BusModule {}
