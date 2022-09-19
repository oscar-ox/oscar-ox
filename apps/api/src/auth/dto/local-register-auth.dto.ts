import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LocalRegisterAuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty({ required: false })
  firstName?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  lastName?: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
