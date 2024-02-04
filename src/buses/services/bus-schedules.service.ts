import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Bus, BusBooking, BusSchedules } from '../entities';
import { AddBusSchedulesDto } from '../dtos/bus-schedules/add-bus-schedules.dto';
import { getCurrentTime } from 'src/utils/date_time_helper';
import * as dayjs from 'dayjs';

@Injectable()
export class BusSchedulesService {
  constructor(
    @Inject('BUS_SCHEDULES_REPOSITORY')
    private busSchedulesRepository: typeof BusSchedules,
  ) {}

  async create(addBusSchedulesDto: AddBusSchedulesDto) {
    try {
      const busSchedules = await this.busSchedulesRepository.create({
        ...addBusSchedulesDto,
      });

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        message: 'bus schedules created successfully',
        data: busSchedules,
      };
    } catch (error) {
      console.log('bus schedules create failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findAll() {
    try {
      const busSchedules =
        await this.busSchedulesRepository.findAll<BusSchedules>({
          include: [Bus],
        });

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'bus schedules fetched successfully',
        data: busSchedules,
      };
    } catch (error) {
      console.log('bus schedules fetch failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findAllById(id: string, date: string) {
    try {
      const busSchedules =
        await this.busSchedulesRepository.findAll<BusSchedules>({
          where: { busId: id, date },
          include: [Bus, BusBooking],
        });

      const currentTime = getCurrentTime();
      const currentDate = dayjs().format('DD_MMM_YYYY');

      const updatedBusSchedules = [];

      if (currentDate === date) {
        const newBusSchedules = JSON.parse(JSON.stringify(busSchedules));

        newBusSchedules.forEach((schedule) => {
          if (+schedule.startTime > +currentTime) {
            updatedBusSchedules.push(schedule);
          }
        });
      } else {
        updatedBusSchedules.push(...busSchedules);
      }

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'bus schedules fetched successfully',
        data: updatedBusSchedules,
      };
    } catch (error) {
      console.log('bus schedules fetch failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
