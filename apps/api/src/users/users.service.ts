import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
