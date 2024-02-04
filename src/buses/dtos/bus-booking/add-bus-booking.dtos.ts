import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Validate } from 'class-validator';
import { BusSchedulesExistsRule, UserExistsRule } from 'src/validation-rules';
import { PaymentExistsRule } from 'src/validation-rules/payment-exists.validation';

export class AddBusBookingDto {
  @ApiProperty()
  @IsNumber()
  @Validate(BusSchedulesExistsRule)
  busScheduleId: number;

  @ApiProperty()
  @IsNumber()
  totalSeatsBooked: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Validate(UserExistsRule)
  userId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  @IsOptional()
  @Validate(PaymentExistsRule)
  paymentId: string;

  @ApiProperty()
  @IsOptional()
  expireAt: Date;
}
