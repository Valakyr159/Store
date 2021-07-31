import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>
  ) { }

  findAll() {
    return this.usersModel.find().exec();
  }

  findOne(id: string) {
    const user = this.usersModel
      .findById(id)
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = new this.usersModel(data)
    return newUser;
  }

  update(id: string, changes: UpdateUserDto) {
    const user = this.usersModel
      .findByIdAndUpdate(
        id,
        { $set: changes },
        { new: true })
      .exec()
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }


    return user;
  }

  remove(id: number) {
    const user = this.usersModel.findByIdAndDelete(id)
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return true;
  }

  /*
  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }*/
}
