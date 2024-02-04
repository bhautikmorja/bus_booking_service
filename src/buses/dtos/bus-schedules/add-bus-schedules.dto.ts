import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, MaxLength, Validate } from 'class-validator';
import { BusExistsRule } from 'src/validation-rules';

export class AddBusSchedulesDto {
  @ApiProperty()
  @IsNumber()
  @Validate(BusExistsRule)
  busId: number;

  @ApiProperty()
  @IsNumber()
  totalSeats: number;

  @ApiProperty()
  @IsNumber()
  ticketPrice: number;

  @ApiProperty()
  @MaxLength(50)
  startDestination: string;

  @ApiProperty()
  @MaxLength(50)
  endDestination: string;

  @ApiProperty()
  @MaxLength(50)
  startTime: string;

  @ApiProperty()
  @MaxLength(50)
  @IsOptional()
  endTime: string;
}
