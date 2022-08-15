import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import * as bcrypt from 'bcrypt';

import { LocalRegisterAuthDto, LocalLoginAuthDto } from './dto';
import { AuthEntity } from './entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async localRegister(dto: LocalRegisterAuthDto): Promise<AuthEntity> {
    // hash the password
    const hash = await bcrypt.hash(dto.password, 10);

    try {
      // create the user in the database
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          hash: hash,
        },
      });

      // create the new session in the database
      const sessionId = await this.createSession(user.id);

      // return the two tokens
      return this.signTokens(user.id, user.email, sessionId);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // check if the email has already been used
          throw new ForbiddenException('Email already taken');
        }
      }

      // if the error is not handled
      throw error;
    }
  }

  async localLogin(dto: LocalLoginAuthDto) {
    // find the user in the database using email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // check if a user was found
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // check if the password is valid
    const passwordValid = await bcrypt.compare(dto.password, user.hash);

    // throw an error if the password is not valid
    if (!passwordValid) throw new ForbiddenException('Credentials incorrect');

    // create the new session in the database
    const sessionId = await this.createSession(user.id);

    // return the two tokens
    return this.signTokens(user.id, user.email, sessionId);
  }

  async logout(sessionId: string) {
    // end the session
    this.endSession(sessionId);
  }

  async refresh(sessionId: string) {
    // find the session in the database
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
      },
    });

    // check if the session actually exists
    if (!session) throw new ForbiddenException();

    // check if the session has been revoked
    if (session.revoked) throw new ForbiddenException('Session revoked');

    // update the session
    this.updateSession(sessionId);

    // return the two tokens
    return this.signTokens(session.user.id, session.user.email, session.id);
  }

  async createSession(userId: string): Promise<string> {
    const session = await this.prisma.session.create({
      data: { userId: userId },
    });

    return session.id;
  }

  async updateSession(id: string) {
    await this.prisma.session.update({
      where: { id: id },
      data: { updatedAt: new Date() },
    });
  }

  async endSession(id: string) {
    await this.prisma.session.update({
      where: { id: id },
      data: { revoked: true },
    });
  }

  async signTokens(
    userId: string,
    email: string,
    sessionId: string,
  ): Promise<AuthEntity> {
    // form the access token payload
    const accessTokenPayload = {
      sub: userId,
      email,
      sessionId: sessionId,
    };

    // form refresh token payload
    const refreshTokenPayload = {
      sub: sessionId,
    };

    // form both tokens required
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(accessTokenPayload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      }),
      this.jwt.signAsync(refreshTokenPayload, {
        expiresIn: '7d',
        secret: this.config.get('JWT_REFRESH_SECRET'),
      }),
    ]);

    // return the two tokens
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
