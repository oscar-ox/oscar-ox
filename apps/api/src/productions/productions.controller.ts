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
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ErrorEntity, ProductionEntity } from './entities';

import { JwtGuard } from 'src/auth/guard';

@Controller('productions')
@ApiTags('productions')
@ApiBadRequestResponse({ type: ErrorEntity })
@ApiUnauthorizedResponse({ type: ErrorEntity })
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
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: [ProductionEntity] })
  findAll() {
    return this.productionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductionEntity })
  findOne(@Param('id') id: string) {
    return this.productionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ type: ProductionEntity })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return this.productionsService.update(id, updateProductionDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.productionsService.remove(id);
  }
}
