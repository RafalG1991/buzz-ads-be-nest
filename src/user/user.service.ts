import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(user: User, updateUserData: UpdateUserDto) {
    try {
      let userToUpdate = await User.findOne({
        where: {
          id: user.id,
        }
      });
      if (!userToUpdate) {
        return {
          ok: false,
          message: 'User not found!',
        }
      }
      userToUpdate = Object.assign(userToUpdate, updateUserData);
      await userToUpdate.save();
      return {
        ok: true,
        message: 'Profile successfully updated!',
      }
    } catch (e) {
      return {
        ok: false,
        message: 'Error! Profile has not been updated! Try again later!',
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
