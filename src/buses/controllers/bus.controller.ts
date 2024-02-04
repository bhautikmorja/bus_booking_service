import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusService } from '../services';
import { Response } from 'express';
import { AddBusDto } from '../dtos/buses/add-bus.dto';

@ApiTags('buses')
@Controller('api/buses')
export class BusController {
  constructor(private busService: BusService) {}

  @Post('')
  async create(@Res() res: Response, @Body() addBusDto: AddBusDto) {
    const response = await this.busService.create(addBusDto);

    if (response.status === 'success') {
      return res.status(HttpStatus.CREATED).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('')
  async findAll(@Res() res: Response) {
    const response = await this.busService.findAll();

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }
}
