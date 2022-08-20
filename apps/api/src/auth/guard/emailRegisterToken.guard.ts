import { AuthGuard } from '@nestjs/passport';

export class JwtEmailRegisterGuard extends AuthGuard('jwt-email-register') {
  constructor() {
    super();
  }
}
