import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailRegisterAuthDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
