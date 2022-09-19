import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EmailRegisterAuthDto {
  @IsOptional()
  @ApiProperty({ required: false })
  firstName?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  lastName?: string;
}
