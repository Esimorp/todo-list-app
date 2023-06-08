import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user/user.service';
import { APP_SECRET, AUTH_TOKEN_KEY } from '../common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.get(AUTH_TOKEN_KEY);
    if (!token) {
      throw new UnauthorizedException();
    }

    const appSecret = this.configService.get(APP_SECRET);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: appSecret,
      });
      request['user'] = await this.userService.verifyUserToken(payload);
      if (!request['user']) {
        throw new ForbiddenException();
      }
    } catch (e) {
      throw e;
    }
    return true;
  }
}
