import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import dbConfig from './config/db.config';
import { AdModule } from './ad/ad.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    UserModule,
    AuthModule,
    MailModule,
    AdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
