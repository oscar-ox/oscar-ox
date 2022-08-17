import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailVerifyTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-email-verify',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_EMAIL_VERIFY_SECRET'),
    });
  }

  async validate(payload: { sub: string }) {
    const session = await this.prisma.session.findUnique({
      where: {
        id: payload.sub,
      },
    });

    return session;
  }
}
