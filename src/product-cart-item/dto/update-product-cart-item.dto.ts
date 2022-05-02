import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateProductCartItemDto } from './create-product-cart-item.dto';

export class UpdateProductCartItemDto extends PartialType(
  CreateProductCartItemDto,
) {
  @ApiProperty()
  @IsNumber()
  quantity: number;
}
