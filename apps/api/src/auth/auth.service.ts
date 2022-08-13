import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import * as bcrypt from 'bcrypt';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterAuthDto) {
    // gnerate the password hash
    const hash = await bcrypt.hash(dto.password, saltOrRounds);

    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          hash: hash,
        },
      });

      // return the new user
      return this.signTocken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already taken');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginAuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // if user does not exist throw exceptiom
    if (!user) throw new ForbiddenException('Credentials incorrect');

    //compare passwor
    const passwordValid = await bcrypt.compare(dto.password, user.hash);

    // if password incorrect thow exceptopms
    if (!passwordValid) throw new ForbiddenException('Credentials incorrect');

    // send back the user
    return this.signTocken(user.id, user.email);
  }

  async signTocken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
