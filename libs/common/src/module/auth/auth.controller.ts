import { Controller, Post } from '@nestjs/common';
import { AuthService } from '@libs/common/src/module/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(): Promise<void> {
    return;
  }
  @Post()
  logout(): Promise<void> {
    return;
  }
}
