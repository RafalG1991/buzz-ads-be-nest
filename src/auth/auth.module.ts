import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './role.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RoleGuard],
  exports: [JwtStrategy],
})
export class AuthModule {}
