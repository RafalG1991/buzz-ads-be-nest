import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/entities/user.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  create(@UserObj() user: User, @Body() newAd: CreateAdDto) {
    return this.adService.createAd(user, newAd);
  }

  @Get()
  findAll() {
    return this.adService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adService.update(+id, updateAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adService.remove(+id);
  }
}
