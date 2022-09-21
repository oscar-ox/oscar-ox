import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('self')
  @ApiOkResponse({ type: UserEntity })
  findSelf(@GetUser('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('self')
  @ApiCreatedResponse({ type: UserEntity })
  updateSelf(@GetUser('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('self')
  removeSelf(@GetUser('id') id: string) {
    return this.usersService.remove(id);
  }
}
