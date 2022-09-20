import { Company } from 'generated/client';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyEntity implements Company {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;
}
