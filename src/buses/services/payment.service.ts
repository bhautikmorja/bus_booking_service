import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Payment } from '../entities';
import { AddPaymentDto } from '../dtos/payments/payments.dtos';
import Razorpay from 'razorpay';
import { AddRazorpayDto } from '../dtos/payments/add-razorpay.dtos';
import { InjectRazorpay } from 'nestjs-razorpay';

@Injectable()
export class PaymentService {
  // public razorpay: Razorpay;
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: typeof Payment,
    private readonly mailerService: MailerService,
    // public razorpay: Razorpay,
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
  ) {
    // this.razorpay = new Razorpay({
    //   key_id: 'rzp_test_nxe9Adu5ggvxQZ',
    //   key_secret: 'TXCiwTm5iVZE6a5UrVhrxAUE',
    // });
  }

  async create(addPaymentDto: AddPaymentDto) {
    try {
      const payment = await this.paymentRepository.create({
        ...addPaymentDto,
      });

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        message: 'bus booking created successfully',
        data: payment,
      };
    } catch (error) {
      console.log('bus booking create failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createRazorpay(addRazorpayDto: AddRazorpayDto) {
    try {
      const { amount } = addRazorpayDto;

      const options = {
        amount: amount * 100,
        currency: 'INR',
      };

      const payment = await this.razorpayClient.orders.create(options);

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        message: 'bus booking created successfully',
        data: payment,
      };
    } catch (error) {
      console.log('bus booking create failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findAll() {
    try {
      const payment = await this.paymentRepository.findAll<Payment>();

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'bus booking fetched successfully',
        data: payment,
      };
    } catch (error) {
      console.log('bus booking fetch failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async ticketBookedUserEmail({ to, from, subject, template, data }) {
    await this.mailerService.sendMail({
      to,
      from,
      subject,
      template,
      context: {
        ...data,
      },
    });
    // }
  }
}
