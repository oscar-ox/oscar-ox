import { AuthGuard } from '@nestjs/passport';

export class JwtEmailVerifyGuard extends AuthGuard('jwt-email-verify') {
  constructor() {
    super();
  }
}
