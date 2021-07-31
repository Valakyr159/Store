import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';
import { BrandController } from './controllers/brand.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandService } from './services/brand.service';
import { CategoriesService } from './services/categories.service';
import { Product, ProductSchema } from './entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema,
    },
    {
      name: Brand.name,
      schema: BrandSchema,
    }
  ])],
  controllers: [ProductsController, CategoriesController, BrandController],
  providers: [ProductsService, BrandService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule { }
