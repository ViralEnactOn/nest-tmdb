import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from './user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.userService.validateUserCreds(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
