import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class AddBusDto {
  @ApiProperty()
  @MaxLength(15)
  busNumber: string;
}
