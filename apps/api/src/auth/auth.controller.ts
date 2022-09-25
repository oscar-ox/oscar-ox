import { Body, Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Response } from 'express';

import { AuthService } from './auth.service';
import {
  LocalRegisterAuthDto,
  LocalLoginAuthDto,
  EmailRegisterAuthDto,
  EmailLoginAuthDto,
  EmailStartAuthDto,
} from './dto';
import { AuthEntity, EmailEntity, ErrorEntity } from './entity';
import { GetUser } from './decorator';
import {
  JwtEmailRegisterGuard,
  JwtEmailVerifyGuard,
  JwtRefreshGuard,
} from './guard';
import { Session, User } from 'generated/client';

@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse({ type: ErrorEntity })
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
      domain: '.ox.nathanrignall.uk',
    });

    return tokens;
  }

  @Post('/email/start')
  @ApiOkResponse({ type: EmailEntity })
  emailStart(
    @Body() emailStartAuthDto: EmailStartAuthDto,
  ): Promise<EmailEntity> {
    return this.authService.emailStart(emailStartAuthDto);
  }

  @Post('/email/register')
  @UseGuards(JwtEmailRegisterGuard)
  @ApiOkResponse({ type: AuthEntity })
  @ApiBearerAuth()
  async emailRegister(
    @Res({ passthrough: true }) response: Response,
    @Body() emailRegisterAuthDto: EmailRegisterAuthDto,
    @GetUser() user: User,
  ): Promise<AuthEntity> {
    const tokens = await this.authService.emailRegister(
      emailRegisterAuthDto,
      user,
    );

    response.cookie('refreshToken', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      domain: '.ox.nathanrignall.uk',
    });

    return tokens;
  }

  @Post('/email/login')
  @ApiOkResponse({ type: EmailEntity })
  emailLogin(
    @Body() emailLoginAuthDto: EmailLoginAuthDto,
  ): Promise<EmailEntity> {
    return this.authService.emailLogin(emailLoginAuthDto);
  }

  @Post('/email/verify')
  @UseGuards(JwtEmailVerifyGuard)
  @ApiOkResponse({ type: AuthEntity })
  @ApiBearerAuth()
  async emailVerify(
    @Res({ passthrough: true }) response: Response,
    @GetUser() session: Session,
  ): Promise<AuthEntity> {
    const tokens = await this.authService.emailVerify(session);

    response.cookie('refreshToken', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      domain: '.ox.nathanrignall.uk',
    });

    return tokens;
  }

  @Post('/logout')
  @UseGuards(JwtRefreshGuard)
  @ApiCookieAuth()
  logout(@GetUser() session: Session) {
    return this.authService.logout(session);
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiOkResponse({ type: AuthEntity })
  @ApiCookieAuth()
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @GetUser() session: Session,
  ) {
    const tokens = await this.authService.refresh(session);

    response.cookie('refreshToken', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      domain: '.ox.nathanrignall.uk',
    });

    return tokens;
  }
}
