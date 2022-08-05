import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ProductionEntity } from './entities/production.entity';

@Controller('productions')
@ApiTags('productions')
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductionEntity })
  create(@Body() createProductionDto: CreateProductionDto) {
    return this.productionsService.create(createProductionDto);
  }

  @Get()
  @ApiOkResponse({ type: [ProductionEntity] })
  findAll() {
    return this.productionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: [ProductionEntity] })
  findOne(@Param('id') id: string) {
    return this.productionsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductionEntity })
  update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return this.productionsService.update(id, updateProductionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: [ProductionEntity] })
  remove(@Param('id') id: string) {
    return this.productionsService.remove(id);
  }
}
