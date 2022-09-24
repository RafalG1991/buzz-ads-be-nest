import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/login.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { User } from '../user/entities/user.entity';
import { AuthUser, Status } from '../../types';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.JWT_SECRET, { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOneBy({ currentTokenId: token });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOneBy({
        email: req.email,
      });
      if (user && user.status === Status.INACTIVE) {
        return res.json({
          ok: false,
          message:
            'Twoje konto jest nieaktywne! Kliknij w link wysłany do Ciebie w wiadomości e-mail aby aktywować konto!',
        });
      }
      if (!user || !(await bcrypt.compare(req.password, user.password))) {
        return res.json({
          ok: false,
          message: 'Nieprawidłowy email lub hasło!',
        });
      }

      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.json({ ok: true, message: 'Wylogowano!' });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async checkActiveUser(user: User, res: Response) {
    return res.json({
      ok: true,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    } as AuthUser);
  }

  async activateAccountAndSetPassword(
    userId: string,
    activationToken: string,
    newPassword: string,
  ) {
    try {
      const userToActivate = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (
        !userToActivate ||
        !userToActivate.activationToken ||
        userToActivate.activationToken !== activationToken
      ) {
        return {
          ok: false,
          message: 'Aktywacja nieudana! Nieprawidłowe dane!',
        };
      }
      userToActivate.activationToken = null;
      userToActivate.status = Status.ACTIVE;
      userToActivate.password = await bcrypt.hash(newPassword, 10);
      await userToActivate.save();
      return {
        ok: true,
        message: 'Hasło ustawione! Konto zostało aktywowane!',
      };
    } catch (e) {
      return {
        ok: false,
        message: 'Coś poszło nie tak! Spróbuj ponownie później!',
      };
    }
  }
}
