import { ApiProperty } from '@nestjs/swagger';
export class EmailRegisterAuthDto {
  @ApiProperty()
  firstName: string | null;

  @ApiProperty()
  lastName: string | null;
}
