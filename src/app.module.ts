import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { KyselyModule } from 'nestjs-kysely';
import { MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { UserModule } from './user/user.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KyselyModule.forRoot({
      dialect: new MysqlDialect({
        pool: createPool({
          host: appConfig().dbHost,
          user: appConfig().dbUser,
          password: appConfig().dbPass,
          database: appConfig().dbName,
          port: appConfig().dbPort,
        }),
      }),
    }),
    MovieModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
