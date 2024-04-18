import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from 'src/@types';
import { User } from 'src/config/types';
import { UserRegisterRequestDto } from './dto/user.register.req.dto';
import { sha256 } from 'js-sha256';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectKysely() private readonly db: Database,
    private jwtService: JwtService,
  ) {}

  async doUserRegistration(userRegister: UserRegisterRequestDto) {
    const createUser: any = () => ({
      name: userRegister.name,
      email: userRegister.email,
      password: sha256(userRegister.password),
      isVerified: 0,
    });
    const insertUser: any = await this.db
      .insertInto('user')
      .values(createUser)
      .executeTakeFirst();

    if (insertUser) {
      const user = await this.db
        .selectFrom('user')
        .where('id', '=', insertUser?.insertId)
        .selectAll()
        .executeTakeFirst();
      return user;
    }
  }

  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.db
      .selectFrom('user')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!user) throw new BadRequestException();

    if (!(sha256(password) === user.password))
      throw new UnauthorizedException();

    return user;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
