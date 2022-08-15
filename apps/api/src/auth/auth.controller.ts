import { Body, Controller, Post, UseGuards, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { Response } from 'express';

import { AuthService } from './auth.service';
import { LocalRegisterAuthDto, LocalLoginAuthDto } from './dto';
import { AuthEntity } from './entity';
import { GetUser } from './decorator';
import { JwtRefreshGuard } from './guard';

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
  async localLogin(
    @Res({ passthrough: true }) response: Response,
    @Body() loginAuthDto: LocalLoginAuthDto,
  ): Promise<AuthEntity> {
    const tokens = await this.authService.localLogin(loginAuthDto);

    response.cookie('refreshToken', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });

    return tokens;
  }

  @Post('/logout')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiCookieAuth()
  logout(@GetUser('sessionId') sessionId: string) {
    this.authService.logout(sessionId);

    return { sessionId: sessionId };
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiOkResponse({ type: AuthEntity })
  @ApiCookieAuth()
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @GetUser('id') id: string,
  ) {
    const tokens = await this.authService.refresh(id);

    response.cookie('refreshToken', tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });

    return tokens;
  }
}
