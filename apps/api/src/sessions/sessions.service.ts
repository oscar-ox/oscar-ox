import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SessionEntity } from './entities/session.entity';
@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string): Promise<SessionEntity[]> {
    return this.prisma.session.findMany({ where: { userId: userId } });
  }

  findOne(id: string, userId: string): Promise<SessionEntity> {
    return this.prisma.session.findFirst({
      where: { id: id, userId: userId },
    });
  }

  end(id: string) {
    return this.prisma.session.update({
      where: { id: id },
      data: { revoked: true },
    });
  }
}
