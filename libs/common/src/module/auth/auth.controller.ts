import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@libs/common/src/module/auth/auth.service';
import { AuthLoginInDto } from '@libs/common/src/module/auth/dto/auth-login-in.dto';
import { AuthLoginOutDto } from '@libs/common/src/module/auth/dto/auth-login-out.dto';
import { SessionAuthGuard } from '@libs/common/src/module/auth/guard/session-auth.guard';
import { Public } from '@libs/common/src/module/auth/decorator/public.decorator';
import { ContextProvider } from '@libs/common/src/context/context.provider';
import { ApiResponse } from '@libs/common/src/network/api-response';

// @ApiSecurity('apiKey')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(SessionAuthGuard)
  @Post('/login')
  async login(
    @Body() authLoginInDto: AuthLoginInDto,
  ): Promise<AuthLoginOutDto> {
    return this.authService.loginWithSession(authLoginInDto);
  }

  @UseGuards(SessionAuthGuard)
  @Post('/logout')
  async logout(): Promise<ApiResponse<number>> {
    const { userId } = ContextProvider.getSessionData();

    return ApiResponse.ok(userId);
  }
}
