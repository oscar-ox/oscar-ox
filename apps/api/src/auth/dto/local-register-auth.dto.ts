import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LocalRegisterAuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string | null;

  @ApiProperty()
  lastName: string | null;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
