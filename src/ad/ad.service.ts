import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import {Ad} from "./entities/ad.entity";
import {User} from "../user/entities/user.entity";

@Injectable()
export class AdService {
  async createAd(user: User, newAd: CreateAdDto) {
    const ad = new Ad();
    ad.user = user;
    ad.city = newAd.city;
    ad.content = newAd.content;
    ad.title = newAd.title;
    ad.apNumber = newAd.apNumber;
    ad.postalCode = newAd.postalCode;
    ad.street = newAd.street;
    ad.price = newAd.price;
    ad.coordinates = newAd.coordinates;
    ad.validTo = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000)
    await ad.save();
    return {
      ok: true,
      message: 'Successfully added new ad!',
    }
  }

  findAll() {
    return `This action returns all ad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ad`;
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return `This action updates a #${id} ad`;
  }

  remove(id: number) {
    return `This action removes a #${id} ad`;
  }
}
