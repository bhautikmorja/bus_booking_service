import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddRazorpayDto {
  @ApiProperty()
  @IsNumber()
  amount: number;
}
