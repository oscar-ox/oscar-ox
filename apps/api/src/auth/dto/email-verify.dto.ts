import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmailVerifyAuthDto {
  @IsNotEmpty()
  @ApiProperty()
  emailToken: string;
}
