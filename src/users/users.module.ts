import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { OrderController } from './controllers/orders.controllers';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { Customers, CustomersSchema } from './entities/customers.entity';
import { User, UserSchema } from './entities/user.entity';
import { Order, OrderSchema } from './entities/order.entity';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customers.name,
        schema: CustomersSchema
      },
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Order.name,
        schema: OrderSchema
      }
    ])
  ],
  controllers: [CustomerController, UsersController, OrderController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule { }
