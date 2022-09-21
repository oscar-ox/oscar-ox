import { Session } from 'generated/client';
import { ApiProperty } from '@nestjs/swagger';

export class SessionEntity implements Session {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  started: boolean;

  @ApiProperty()
  revoked: boolean;

  @ApiProperty()
  userId: string;
}
