import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { MongoIdPipe } from "src/common/mongo-id.pipe";
import { OrdersService } from "../services/orders.service";
import { CreateOrdersDto, UpdateOrdersDto, AddProductsToOrderDto } from '../dtos/orders.dto';

@Controller('orders')
export class OrderController {
  constructor(private ordersService: OrdersService) { }

  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateOrdersDto) {
    return this.ordersService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrdersDto,
  ) {
    return this.ordersService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.remove(id)
  }

  @Delete(':id/products/:productId')
  removeProduct(@Param('id', MongoIdPipe) id: string, @Param('productId', MongoIdPipe) productId: string) {
    return this.ordersService.removeProduct(id, productId)
  }

  @Put(':id/products')
  updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.ordersService.addProducts(id, payload.productsIds)
  }


}