import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusModule } from './buses/buses.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/user.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          port: process.env.EMAIL_PORT,
        },
        template: {
          dir: __dirname + '/mails',
          adapter: new HandlebarsAdapter(),
        },
      }),
    }),
    DatabaseModule,
    BusModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
