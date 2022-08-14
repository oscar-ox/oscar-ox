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

      // return the two tokens
      return this.signTockens(user.id, user.email);
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

    // return the two tokens
    return this.signTockens(user.id, user.email);
  }

  logout() {}

  refresh() {}

  async signTockens(id: string, email: string): Promise<AuthEntity> {
    // form the payload to be stored in the tokens
    const payload = {
      sub: id,
      email,
    };

    // get the secret used to sign the tokens
    const secret = this.config.get('JWT_SECRET');

    // form both tokens required
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: secret,
      }),
    ]);

    // return the two tokens
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
