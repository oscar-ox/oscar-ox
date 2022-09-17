//src/products/entities/product.entity.ts
import { Session } from 'generated/client';
import { ApiProperty } from '@nestjs/swagger';

export class SessionEntity implements Session {
  @ApiProperty()
  id: string;

  @ApiProperty()
  started: boolean;

  @ApiProperty()
  revoked: boolean;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
