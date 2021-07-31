import { IsString, IsNotEmpty, IsArray } from "class-validator";

import { OmitType, PartialType } from "@nestjs/swagger";

export class CreateOrdersDto {
  @IsNotEmpty()
  readonly date: Date;

  @IsNotEmpty()
  @IsString()
  readonly customer: string;

  @IsNotEmpty()
  @IsArray()
  readonly products: string[];

}

export class UpdateOrdersDto extends PartialType(
  OmitType(CreateOrdersDto, ['products'])
) { }

export class AddProductsToOrderDto {
  @IsNotEmpty()
  @IsArray()
  readonly productsIds: string[];
}