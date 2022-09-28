import {Inject, Injectable} from '@nestjs/common';
import { AuthLoginDto } from './dto/login.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { User } from '../user/entities/user.entity';
import { AuthUser, Status } from '../../types';
import {MailService} from "../mail/mail.service";
import {registrationMailTemplate} from "../templates/email/registration-mail";

@Injectable()
export class AuthService {
  constructor (
    @Inject(MailService)
    private mailService: MailService,
  ) {}

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
      if (!user || !(await bcrypt.compare(req.password, user.password))) {
        return res.json({
          ok: false,
          message: 'Invalid email or password!',
        });
      }
      if (user && user.status === Status.INACTIVE) {
        return res.json({
          ok: false,
          message:
            'Your account is inactive! Check your email for an activation link!',
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
      return res.json({ ok: true, message: 'Logged out successfully!' });
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

  async activateAccountAndUpdateData(
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
          message: 'Activation failed! Provided data is not valid!',
        };
      }
      userToActivate.activationToken = null;
      userToActivate.status = Status.ACTIVE;
      userToActivate.password = await bcrypt.hash(newPassword, 10);
      await userToActivate.save();
      return {
        ok: true,
        message: 'New password set! Account has been successfully activated!',
      };
    } catch (e) {
      return {
        ok: false,
        message: 'Something went wrong! Please try again later!',
      };
    }
  }

  async signup(req: AuthLoginDto) {
    try {
      if (await User.findOneBy({
        email: req.email,
      })) {
        return {
          ok: false,
          message: 'Email already in use! Please try again later!',
        };
      } else {
        const newUser = new User();
        newUser.email = req.email;
        newUser.password = await bcrypt.hash(req.password, 10);
        await newUser.save();
        const user = await User.findOne({ where: { email: newUser.email } });
        const payload: JwtPayload = { id: user.id };
        const expiresIn =
          60 * 60 * 24 * Number(process.env.REGISTRATION_LINK_EXP_TIME_IN_DAYS);
        const accessToken = sign(payload, process.env.JWT_SECRET, {
          expiresIn,
        });
        const url = `register/${user.id}/${accessToken}`;
        await this.mailService.sendMail(
          user.email,
          'BUZZ ADS account activation',
          registrationMailTemplate(url),
        );
        user.activationToken = accessToken;
        await user.save();
        return {
          ok: true,
          message: 'Account has been created! Check your email for activation link!'
        }
      }
    } catch (e) {
      return {
        ok: false,
        message: 'Something went wrong! Please try again later!',
      };
    }
  }
}
