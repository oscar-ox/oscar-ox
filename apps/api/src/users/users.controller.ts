import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';

import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get the user's own user details
  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  findAll(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // update the user's own user details
  @Patch()
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // delete the user's own account
  @Delete()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
