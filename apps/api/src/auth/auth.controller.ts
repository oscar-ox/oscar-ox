import { Body, Controller, Post, UseGuards, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { Response } from 'express';

import { AuthService } from './auth.service';
import {
  LocalRegisterAuthDto,
  LocalLoginAuthDto,
  EmailRegisterAuthDto,
  EmailLoginAuthDto,
  EmailVerifyAuthDto,
} from './dto';
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
    @Body() localRegisterAuthDto: LocalRegisterAuthDto,
  ): Promise<AuthEntity> {
    return this.authService.localRegister(localRegisterAuthDto);
  }

  @Post('/local/login')
  @ApiOkResponse({ type: AuthEntity })
  async localLogin(
    @Res({ passthrough: true }) response: Response,
    @Body() localLoginAuthDto: LocalLoginAuthDto,
  ): Promise<AuthEntity> {
    const tokens = await this.authService.localLogin(localLoginAuthDto);

    response.cookie('refreshToken', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });

    return tokens;
  }

  @Post('/email/register')
  emailRegister(@Body() emailRegisterAuthDto: EmailRegisterAuthDto) {
    return this.authService.emailRegister(emailRegisterAuthDto);
  }

  @Post('/email/login')
  emailLogin(@Body() emailLoginAuthDto: EmailLoginAuthDto) {
    return this.authService.emailLogin(emailLoginAuthDto);
  }

  @Post('/email/verify')
  async emailVerify(
    @Res({ passthrough: true }) response: Response,
    @Body() emailVerifyAuthDto: EmailVerifyAuthDto,
  ): Promise<AuthEntity> {
    const tokens = await this.authService.emailVerify(emailVerifyAuthDto);

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
    return this.authService.logout(sessionId);
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
