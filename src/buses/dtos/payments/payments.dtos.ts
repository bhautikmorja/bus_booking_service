import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddPaymentDto {
  @ApiProperty()
  mode: string;

  @ApiProperty()
  paymentId: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  signature: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
