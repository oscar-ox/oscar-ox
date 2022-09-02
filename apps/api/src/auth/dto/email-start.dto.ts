import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailStartAuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
