import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';

import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

import { SessionsService } from './sessions.service';
import { SessionEntity } from './entities/session.entity';

@Controller('sessions')
@ApiTags('sessions')
@UseGuards(JwtGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @ApiOkResponse({ type: [SessionEntity] })
  findAll(@GetUser('id') userId: string) {
    return this.sessionsService.findAll(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: SessionEntity })
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.sessionsService.findOne(id, userId);
  }

  @Delete(':id')
  end(@Param('id') id: string) {
    return this.sessionsService.end(id);
  }
}
