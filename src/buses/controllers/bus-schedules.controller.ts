import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BusSchedulesService } from '../services';
import { Response } from 'express';
import { AddBusSchedulesDto } from '../dtos/bus-schedules/add-bus-schedules.dto';

@ApiTags('bus schedules')
@Controller('api/bus-schedules')
export class BusSchedulesController {
  constructor(private busSchedulesService: BusSchedulesService) {}

  @Post('')
  async create(
    @Res() res: Response,
    @Body() addBusSchedulesDto: AddBusSchedulesDto,
  ) {
    const response = await this.busSchedulesService.create(addBusSchedulesDto);

    if (response.status === 'success') {
      return res.status(HttpStatus.CREATED).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('')
  async findAll(@Res() res: Response) {
    const response = await this.busSchedulesService.findAll();

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiQuery({ name: 'date', type: 'string' })
  async findAllById(@Res() res: Response, @Param() { id }, @Query() { date }) {
    const response = await this.busSchedulesService.findAllById(id, date);

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }
}
