import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalRegisterAuthDto, LocalLoginAuthDto } from './dto';
import { AuthEntity } from './entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/register')
  @ApiOkResponse({ type: AuthEntity })
  localRegister(
    @Body() registerAuthDto: LocalRegisterAuthDto,
  ): Promise<AuthEntity> {
    return this.authService.localRegister(registerAuthDto);
  }

  @Post('/local/login')
  @ApiOkResponse({ type: AuthEntity })
  localLogin(@Body() loginAuthDto: LocalLoginAuthDto): Promise<AuthEntity> {
    return this.authService.localLogin(loginAuthDto);
  }

  @Post('/logout')
  logout() {}

  @Post('/refresh')
  @ApiOkResponse({ type: AuthEntity })
  refresh() {}
}
