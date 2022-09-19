import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from 'generated/client/runtime';

import { MailService } from 'src/mail/mail.service';

import * as bcrypt from 'bcrypt';

import {
  LocalRegisterAuthDto,
  LocalLoginAuthDto,
  EmailRegisterAuthDto,
  EmailLoginAuthDto,
  EmailStartAuthDto,
} from './dto';
import { AuthEntity, UserEntity, EmailEntity, SessionEntity } from './entity';
import { Session, User } from 'generated/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mail: MailService,
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
      const session = await this.prisma.session.create({
        data: { userId: user.id, started: true },
      });

      // return the two tokens
      return this.signAuthTokens(user.id, session.id);
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
    const session = await this.prisma.session.create({
      data: { userId: user.id, started: true },
    });

    // return the two tokens
    return this.signAuthTokens(user.id, session.id);
  }

  async emailStart(dto: EmailStartAuthDto): Promise<EmailEntity> {
    // find the user in the database using email
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // check if a user was found
    if (user) {
      // check if the account is ghost
      if (!user.ghost) throw new ForbiddenException('Email already taken');

      // check if the account is banned
      if (user.banned) throw new ForbiddenException('Email banned');

      // create the date objects
      const maxLastSent = new Date();
      maxLastSent.setMinutes(maxLastSent.getMinutes() - 10);

      // check if the email has been sent recently
      if (user.lastSent > maxLastSent)
        throw new ForbiddenException('Please wait to send another email');

      // update the last sent value
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastSent: new Date() },
      });
    } else {
      try {
        // create the user in the database (ghost)
        user = await this.prisma.user.create({
          data: {
            email: dto.email,
            lastSent: new Date(),
          },
        });
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

    // form the email register token
    const token = await this.signEmailRegisterToken(user.id);

    // send an email with the token %%TEMP%%
    this.mail.sendRegisterToken(user.email, token);

    // return the user
    return { id: user.id, email: user.email };
  }

  async emailRegister(
    dto: EmailRegisterAuthDto,
    user: User,
  ): Promise<AuthEntity> {
    // check that the account is actually a ghost
    if (!user.ghost) throw new ForbiddenException('Account already registered');

    // check if the account is banned
    if (user.banned) throw new ForbiddenException('Email banned');

    // complete the user account registration
    await this.prisma.user.update({
      where: { id: user.id },
      data: { firstName: dto.firstName, lastName: dto.lastName, ghost: false },
    });

    // create the new session in the database (not started)
    const session = await this.prisma.session.create({
      data: { userId: user.id, started: true },
    });

    // return the two tokens
    return this.signAuthTokens(user.id, session.id);
  }

  async emailLogin(dto: EmailLoginAuthDto): Promise<EmailEntity> {
    // find the user in the database using email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // check if a user was found
    if (!user) throw new ForbiddenException('Account not registered');

    // check that the account is actually a ghost
    if (user.ghost) throw new ForbiddenException('Account not registered');

    // check if the account is banned
    if (user.banned) throw new ForbiddenException('Email banned');

    // create the new session in the database
    const session = await this.prisma.session.create({
      data: { userId: user.id },
    });

    // form the email verify token
    const token = await this.signEmailVerifyToken(session.id);

    // send an email with the token
    this.mail.sendLoginToken(user.email, token);

    // return the user
    return { id: user.id, email: user.email };
  }

  async emailVerify(session: Session) {
    // check if the session has started
    if (session.started)
      throw new ForbiddenException('Session already started');

    // update the session time + started
    await this.prisma.session.update({
      where: { id: session.id },
      data: { started: true, updatedAt: new Date() },
    });

    // return the two tokens
    return this.signAuthTokens(session.userId, session.id);
  }

  async logout(session: Session) {
    // end the session
    await this.prisma.session.update({
      where: { id: session.id },
      data: { revoked: true },
    });
  }

  async refresh(session: Session) {
    // check if the session has been revoked
    if (session.revoked) throw new ForbiddenException('Session revoked');

    // check if the session has not started
    if (!session.started) throw new ForbiddenException('Session not started');

    // update the session time
    await this.prisma.session.update({
      where: { id: session.id },
      data: { updatedAt: new Date() },
    });

    // return the two tokens
    return this.signAuthTokens(session.userId, session.id);
  }

  getUser(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  getSessions(id: string): Promise<SessionEntity[]> {
    return this.prisma.session.findMany({ where: { userId: id } });
  }

  async signAuthTokens(userId: string, sessionId: string): Promise<AuthEntity> {
    // form the access token payload
    const accessTokenPayload = {
      sub: userId,
      sessionId: sessionId,
      type: 'at',
    };

    // form refresh token payload
    const refreshTokenPayload = {
      sub: sessionId,
      type: 'rt',
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

  async signEmailRegisterToken(id: string): Promise<string> {
    // form the generic token payload
    const tokenPayload = {
      sub: id,
      type: 'ert',
    };

    // return the token created
    return this.jwt.signAsync(tokenPayload, {
      expiresIn: '10m',
      secret: this.config.get('JWT_EMAIL_REGISTER_SECRET'),
    });
  }

  async signEmailVerifyToken(id: string): Promise<string> {
    // form the generic token payload
    const tokenPayload = {
      sub: id,
      type: 'evt',
    };

    // return the token created
    return this.jwt.signAsync(tokenPayload, {
      expiresIn: '10m',
      secret: this.config.get('JWT_EMAIL_VERIFY_SECRET'),
    });
  }
}
