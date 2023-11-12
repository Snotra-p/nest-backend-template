import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@libs/common/src/module/auth/auth.service';
import { AuthLoginInDto } from '@libs/common/src/module/auth/dto/auth-login-in.dto';
import { AuthLoginOutDto } from '@libs/common/src/module/auth/dto/auth-login-out.dto';

// @ApiSecurity('apiKey')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @Post('/login')
  async login(
    @Body() authLoginInDto: AuthLoginInDto,
  ): Promise<AuthLoginOutDto> {
    return;
  }

  // @UseGuards(SessionAuthGuard)
  @Post('/logout')
  logout(): Promise<void> {
    return;
  }
}
