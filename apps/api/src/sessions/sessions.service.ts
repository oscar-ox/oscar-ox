import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionsService {
  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: string) {
    return `This action returns a #${id} session`;
  }

  remove(id: string) {
    return `This action removes a #${id} session`;
  }
}
