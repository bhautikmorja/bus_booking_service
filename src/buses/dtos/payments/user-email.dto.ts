import { ApiProperty } from '@nestjs/swagger';

export class UserEmailDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  seat: string;

  @ApiProperty()
  amount: number;
}
