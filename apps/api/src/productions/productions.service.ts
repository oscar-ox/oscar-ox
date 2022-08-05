import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';

@Injectable()
export class ProductionsService {
  constructor(private prisma: PrismaService) {}

  create(createProductionDto: CreateProductionDto) {
    return this.prisma.production.create({ data: createProductionDto });
  }

  findAll() {
    return this.prisma.production.findMany();
  }

  findOne(id: string) {
    return this.prisma.production.findUnique({ where: { id: id } });
  }

  update(id: string, updateProductionDto: UpdateProductionDto) {
    return this.prisma.production.update({
      where: { id: id },
      data: updateProductionDto,
    });
  }

  remove(id: string) {
    return this.prisma.production.delete({ where: { id: id } });
  }
}
