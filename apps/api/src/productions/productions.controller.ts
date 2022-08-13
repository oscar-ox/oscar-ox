import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ProductionEntity } from './entities/production.entity';

import { JwtGuard } from 'src/auth/guard';

@Controller('productions')
@ApiTags('productions')
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ type: ProductionEntity })
  @ApiBearerAuth()
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
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ type: ProductionEntity })
  update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return this.productionsService.update(id, updateProductionDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: [ProductionEntity] })
  remove(@Param('id') id: string) {
    return this.productionsService.remove(id);
  }
}
