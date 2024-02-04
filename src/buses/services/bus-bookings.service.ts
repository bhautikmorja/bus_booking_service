import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BusBooking } from '../entities';
import * as dayjs from 'dayjs';
import { Op } from 'sequelize';
import { AddBusBookingDto } from '../dtos/bus-booking/add-bus-booking.dtos';

@Injectable()
export class BusBookingService {
  constructor(
    @Inject('BUS_BOOKING_REPOSITORY')
    private busBookingRepository: typeof BusBooking,
  ) {}

  async create(addBusBookingDto: AddBusBookingDto) {
    try {
      const now = dayjs();
      const tenMinutesFromNow = now.add(10, 'minutes').toDate();

      const busBooking = await this.busBookingRepository.create({
        ...addBusBookingDto,
        expireAt: tenMinutesFromNow,
      });

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        message: 'bus booking created successfully',
        data: busBooking,
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
      const busBooking = await this.busBookingRepository.findAll<BusBooking>();

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'bus booking fetched successfully',
        data: busBooking,
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

  async update(id: number, addBusBookingDto: AddBusBookingDto) {
    try {
      const busBooking = await this.busBookingRepository.update(
        { ...addBusBookingDto },
        { where: { id } },
      );

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'bus booking updated successfully',
        data: busBooking,
      };
    } catch (error) {
      console.log('bus booking update failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async delete() {
    try {
      const now = dayjs();
      const expiredBookings =
        await this.busBookingRepository.findAll<BusBooking>({
          where: { status: 'pending', expireAt: { [Op.lte]: now.toDate() } },
        });

      if (expiredBookings.length === 0) {
        return {
          status: 'success',
          statusCode: HttpStatus.OK,
          data: {
            message: 'No expired bookings found.',
          },
        };
      }

      for (const booking of expiredBookings) {
        await booking.destroy();
      }

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: {
          message: 'Expired bookings deleted successfully.',
        },
      };
    } catch (error) {
      console.log('bus booking delete failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findAllByUser(id: string) {
    try {
      const busBooking = await this.busBookingRepository.findAll<BusBooking>({
        where: { userId: id, status: 'confirmed' },
      });

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'bus booking fetched successfully',
        data: busBooking,
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
}
