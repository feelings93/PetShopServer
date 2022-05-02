import { PartialType } from '@nestjs/swagger';
import { CreateProductOrderItemDto } from './create-product-order-item.dto';

export class UpdateProductOrderItemDto extends PartialType(
  CreateProductOrderItemDto,
) {}
