import { Injectable } from '@nestjs/common';
import { Database } from 'src/@types';
import { InjectKysely } from 'nestjs-kysely';
import { Movie } from 'src/config/types';

@Injectable()
export class MovieService {
  constructor(@InjectKysely() private readonly db: Database) {}
  create(createMovieDto: Movie) {
    return 'This action adds a new movie';
  }

  async findAll() {
    return await this.db.selectFrom('movie').selectAll().execute();
  }

  async findOne(id: number) {
    return await this.db
      .selectFrom('movie')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  update(id: number, updateMovieDto: Movie) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
