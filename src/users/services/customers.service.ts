import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customers } from '../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name) private customersModel: Model<Customers>
  ) { }

  findAll() {
    return this.customersModel.find().exec()
  }

  findOne(id: string) {
    const customer = this.customersModel
      .findById(id)
      .exec()
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = new this.customersModel(data);
    return newCustomer.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    const customer = this.customersModel
      .findByIdAndUpdate(id,
        { $set: changes },
        { new: true })
      .exec()

    return customer;
  }

  remove(id: string) {
    return this.customersModel.findByIdAndDelete(id)
  }
}
