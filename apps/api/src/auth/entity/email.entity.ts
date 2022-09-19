import { ApiProperty } from '@nestjs/swagger';

export class EmailEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}
