//src/products/entities/product.entity.ts
import { Production } from 'generated/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductionEntity implements Production {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;
}
