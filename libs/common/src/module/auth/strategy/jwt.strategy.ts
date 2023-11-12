import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/configuration';
import { AuthPayload } from '@libs/common/src/module/auth/type/auth-payload';
import { NodeEnvironment } from '@libs/common/src/constants/config';
import {
  AUTH_STRATEGY,
  TokenType,
} from '@libs/common/src/module/auth/constants/auth.constants.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_STRATEGY.JWT) {
  constructor(configService: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest:
        configService.get('env', { infer: true }) === NodeEnvironment.PROD
          ? ExtractJwt.fromAuthHeaderAsBearerToken()
          : ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.publicKey', { infer: true }),
    });
  }

  async validate(args: AuthPayload): Promise<AuthPayload> {
    if (args.type !== TokenType.ACCESS) {
      throw new UnauthorizedException();
    }

    if (!args) {
      throw new UnauthorizedException();
    }

    return args;
  }
}
