import { ApiProperty } from '@nestjs/swagger';

export class ErrorEntity {
  @ApiProperty()
  message: [string];

  @ApiProperty()
  statusCode: number;
}
