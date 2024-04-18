import { Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from 'src/@types';
import { User } from 'src/config/types';
import { UserRegisterRequestDto } from './dto/user.register.req.dto';
import { sha256 } from 'js-sha256';

@Injectable()
export class UserService {
  constructor(@InjectKysely() private readonly db: Database) {}

  create(createUserDto: User) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

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
}
