import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  EmailRegisterTokenStrategy,
  EmailVerifyTokenStrategy,
} from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    EmailRegisterTokenStrategy,
    EmailVerifyTokenStrategy,
  ],
})
export class AuthModule {}
