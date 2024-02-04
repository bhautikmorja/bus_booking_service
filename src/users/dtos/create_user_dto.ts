import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class AddUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty()
  @MaxLength(100)
  lastName: string;

  @ApiProperty()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @MinLength(10)
  @IsOptional()
  @MaxLength(10)
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
