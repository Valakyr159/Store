import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Order } from "src/users/entities/order.entity";
import { CreateOrdersDto, UpdateOrdersDto } from "src/users/dtos/orders.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>
  ) { }

  findAll() {
    return this.orderModel.find().populate('customer').populate('products').exec()
  }

  findOne(id: string) {
    const order = this.orderModel
      .findById(id)
      .populate('customer')
      .populate('products')
      .exec()
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`)
    }
    return order
  }

  create(data: CreateOrdersDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save()
  }

  update(id: string, changes: UpdateOrdersDto) {
    const order = this.orderModel
      .findByIdAndUpdate(id,
        { $set: changes },
        { new: true })
      .exec()
    return order
  }

  remove(id: string) {
    return this.orderModel
      .findByIdAndDelete(id)
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id)
    order.products.pull(productId)
    return order.save()
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id)
    productsIds.forEach((pId) => order.products.push(pId))
    return order.save()
  }
}