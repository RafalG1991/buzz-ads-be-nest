import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './role.guard';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RoleGuard, MailService],
  exports: [JwtStrategy],
})
export class AuthModule {}
