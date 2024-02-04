import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BusBookingService } from '../services';
import { Response } from 'express';
import { AddBusBookingDto } from '../dtos/bus-booking/add-bus-booking.dtos';
import { verifyToken } from 'src/utils/auth_helper';

@ApiTags('bus booking')
@Controller('api/bus-booking')
export class BusBookingController {
  constructor(private busBookingService: BusBookingService) {}

  @ApiBearerAuth()
  @Post('')
  async create(
    @Res() res: Response,
    @Body() addBusBookingDto: AddBusBookingDto,
    @Headers() headers: Record<string, string>,
  ) {
    const user = await verifyToken(headers.authorization);

    console.log({ user });
    if (!user)
      return res.status(400).json({
        message:
          'Please send a valid token or you dont have the necessary privilege to view this page',
      });

    const response = await this.busBookingService.create({
      ...addBusBookingDto,
      userId: user.user,
    });

    if (response.status === 'success') {
      return res.status(HttpStatus.CREATED).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('')
  async findAll(@Res() res: Response) {
    const response = await this.busBookingService.findAll();

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('/user/:id')
  async findAllByUser(@Res() res: Response, @Param('id') id: string) {
    const response = await this.busBookingService.findAllByUser(id);
    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }
    return res.status(response.statusCode).json({ message: response.message });
  }

  @ApiBearerAuth()
  @Put('/:id')
  async update(
    @Res() res: Response,
    @Body() addBusBookingDto: AddBusBookingDto,
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
  ) {
    const user = await verifyToken(headers.authorization);
    console.log({ user });
    if (!user)
      return res.status(400).json({
        message:
          'Please send a valid token or you dont have the necessary privilege to view this page',
      });

    const response = await this.busBookingService.update(+id, {
      ...addBusBookingDto,
      userId: user.user,
    });

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Delete('/expire')
  async delete(@Res() res: Response, @Headers() headers: any) {
    const response = await this.busBookingService.delete();

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }
}
