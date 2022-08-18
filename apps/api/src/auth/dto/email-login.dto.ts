import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailLoginAuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
