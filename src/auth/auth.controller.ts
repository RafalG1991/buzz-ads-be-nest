import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async showUser(@UserObj() user: User, @Res() res: Response) {
    return this.authService.checkActiveUser(user, res);
  }

  @Patch('/activate/:userId/:activationToken')
  async activateAccountSetPassword(
    @Param('userId') userId: string,
    @Param('activationToken') activationToken: string,
    @Body() { newPassword }: { newPassword: string },
  ) {
    return this.authService.activateAccountAndSetPassword(
      userId,
      activationToken,
      newPassword,
    );
  }
}
