import { PartialType } from '@nestjs/mapped-types';
import { CreateProductOrderItemDto } from './create-product-order-item.dto';

export class UpdateProductOrderItemDto extends PartialType(CreateProductOrderItemDto) {}
