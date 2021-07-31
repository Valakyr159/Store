import { IsString, IsNotEmpty, IsPhoneNumber, ValidateNested, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateSubDocDto } from './sub-doc.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDoc: CreateSubDocDto[]
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }
