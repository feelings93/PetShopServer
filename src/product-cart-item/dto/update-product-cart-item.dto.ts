import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCartItemDto } from './create-product-cart-item.dto';

export class UpdateProductCartItemDto extends PartialType(CreateProductCartItemDto) {}
