import { Controller, Get, Param, Delete } from '@nestjs/common';

import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { SessionsService } from './sessions.service';
import { SessionEntity } from './entities/session.entity';

@Controller('sessions')
@ApiTags('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  // get all of a users own sesisons
  @Get()
  @ApiOkResponse({ type: [SessionEntity] })
  findAll() {
    return this.sessionsService.findAll();
  }

  // get one of the users own sesisons
  @Get(':id')
  @ApiOkResponse({ type: SessionEntity })
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  // end one of the user's own sessions
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
