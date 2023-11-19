import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@libs/common/src/module/auth/auth.service';
import { AuthLoginInDto } from '@libs/common/src/module/auth/dto/auth-login-in.dto';
import { SessionAuthGuard } from '@libs/common/src/module/auth/guard/session-auth.guard';
import { Public } from '@libs/common/src/module/auth/decorator/public.decorator';
import { ContextProvider } from '@libs/common/src/context/context.provider';
import { ResponseEntity } from '@libs/common/src/response/response-entity';
import { ApiResponseDocs } from '@libs/common/src/decorator/api-response-docs.decorator';
import { ServerErrorKey } from '@libs/common/src/error/server-error-code';
import { Session as FastifySession } from 'fastify';

// @ApiSecurity('apiKey')

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponseDocs({
    summary: '로그인',
    errors: [ServerErrorKey.SESSION_EXPIRED, ServerErrorKey.USER_NOT_FOUND],
  })
  @Public()
  @UseGuards(SessionAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() authLoginInDto: AuthLoginInDto,
    @Session() session: FastifySession,
  ): Promise<ResponseEntity<unknown>> {
    const sessionData = await this.authService.loginWithSession(authLoginInDto);
    Object.assign(session, { data: sessionData });
    return ResponseEntity.ok();
  }
  // @ApiResponseDocs({
  //   summary: '로그인',
  //   errors: [ServerErrorKeys.SESSION_EXPIRED, ServerErrorKeys.USER_NOT_FOUND],
  // })
  @UseGuards(SessionAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  async logout(): Promise<ResponseEntity<number>> {
    const { userId } = ContextProvider.getSessionData();

    return ResponseEntity.ok(userId);
  }
}
