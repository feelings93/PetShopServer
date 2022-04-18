import { Injectable } from '@nestjs/common';
import { CreateProductOrderItemDto } from './dto/create-product-order-item.dto';
import { UpdateProductOrderItemDto } from './dto/update-product-order-item.dto';

@Injectable()
export class ProductOrderItemService {
  create(createProductOrderItemDto: CreateProductOrderItemDto) {
    return 'This action adds a new productOrderItem';
  }

  findAll() {
    return `This action returns all productOrderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOrderItem`;
  }

  update(id: number, updateProductOrderItemDto: UpdateProductOrderItemDto) {
    return `This action updates a #${id} productOrderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOrderItem`;
  }
}
