import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Bus } from '../entities';
import { AddBusDto } from '../dtos/buses/add-bus.dto';

@Injectable()
export class BusService {
  constructor(
    @Inject('BUS_REPOSITORY')
    private busRepository: typeof Bus,
  ) {}

  async create(addBusDto: AddBusDto) {
    try {
      const bus = await this.busRepository.create({
        busNumber: addBusDto.busNumber,
      });

      console.log(bus);

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        message: 'bus created successfully',
        data: bus,
      };
    } catch (error) {
      console.log('bus create failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findAll() {
    try {
      const buses = await this.busRepository.findAll();

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'buses fetched successfully',
        data: buses,
      };
    } catch (error) {
      console.log('buses fetch failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
