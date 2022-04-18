import { Injectable } from '@nestjs/common';
import { CreateProductCartItemDto } from './dto/create-product-cart-item.dto';
import { UpdateProductCartItemDto } from './dto/update-product-cart-item.dto';

@Injectable()
export class ProductCartItemService {
  create(createProductCartItemDto: CreateProductCartItemDto) {
    return 'This action adds a new productCartItem';
  }

  findAll() {
    return `This action returns all productCartItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCartItem`;
  }

  update(id: number, updateProductCartItemDto: UpdateProductCartItemDto) {
    return `This action updates a #${id} productCartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCartItem`;
  }
}
