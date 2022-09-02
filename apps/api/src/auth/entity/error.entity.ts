import { ApiProperty } from '@nestjs/swagger';

export class ErrorEntity {
  @ApiProperty()
  error: string;

  @ApiProperty()
  message: [string];

  @ApiProperty()
  statusCode: number;
}
