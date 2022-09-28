import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import mailerConfig = require('../config/mailer.config');
import {MailerModule} from "@nestjs-modules/mailer";

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
