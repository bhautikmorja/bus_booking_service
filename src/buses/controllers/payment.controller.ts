import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AddPaymentDto } from '../dtos/payments/payments.dtos';
import { PaymentService } from '../services';
import { AddRazorpayDto } from '../dtos/payments/add-razorpay.dtos';
import { UserEmailDto } from '../dtos/payments/user-email.dto';
import { verifyToken } from 'src/utils/auth_helper';
import { UserService } from 'src/users/user.service';

@ApiTags('payments')
@Controller('api/payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private readonly userService: UserService,
  ) {}

  @Post('')
  async create(@Res() res: Response, @Body() addPaymentDto: AddPaymentDto) {
    const response = await this.paymentService.create(addPaymentDto);

    if (response.status === 'success') {
      return res.status(HttpStatus.CREATED).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Post('/razorpay')
  async createRazorpay(
    @Res() res: Response,
    @Body() addRazorpayDto: AddRazorpayDto,
  ) {
    const response = await this.paymentService.createRazorpay(addRazorpayDto);

    if (response.status === 'success') {
      return res.status(HttpStatus.CREATED).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('')
  async findAll(@Res() res: Response) {
    const response = await this.paymentService.findAll();

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @ApiBearerAuth()
  @Post('/ticket-booked/user-email')
  async ticketBookedUserEmail(
    @Res() res: Response,
    @Body() userEmailDto: UserEmailDto,
    @Headers() headers: Record<string, string>,
  ) {
    const user = await verifyToken(headers.authorization);

    if (!user) {
      return res.status(400).json({
        message:
          'Please send a valid token or you dont have the necessary privilege to view this page',
      });
    }

    const findUserById = await this.userService.findOne(user.user);

    if (!findUserById) {
      return res.status(400).json({
        message: "User doesn't exits",
      });
    }
    console.log(findUserById.data.email);
    try {
      await this.paymentService.ticketBookedUserEmail({
        to: findUserById.data.email,
        from: 'lokhandwalabusservice@gmail.com',
        subject: 'Your bus ticket reservation has been successfully confirmed.',
        template: 'user_ticket_booked',
        data: {
          ...userEmailDto,
        },
      });

      await this.paymentService.ticketBookedUserEmail({
        to: 'sargamjaju@gmail.com',
        from: 'lokhandwalabusservice@gmail.com',
        subject: 'Your bus ticket has been successfully reserved',
        template: 'admin_ticket_booked',
        data: {
          ...userEmailDto,
          name: findUserById.data.firstName,
        },
      });

      return 'done';
    } catch (err) {
      console.log('err: ', err);
      return 'failed';
    }
  }
}
