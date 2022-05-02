import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCartItemDto } from './dto/create-product-cart-item.dto';
import { UpdateProductCartItemDto } from './dto/update-product-cart-item.dto';
import { ProductCartItem } from './entities/product-cart-item.entity';

@Injectable()
export class ProductCartItemService {
  constructor(
    @InjectRepository(ProductCartItem)
    private readonly pciRepo: Repository<ProductCartItem>,
  ) {}
  create(createProductCartItemDto: CreateProductCartItemDto) {
    return 'This action adds a new productCartItem';
  }

  findAll() {
    return `This action returns all productCartItem`;
  }

  async findOne(id: number) {
    const productItem = await this.pciRepo.findOne(id);
    if (!productItem)
      throw new NotFoundException('Product cart item not found!');
    return productItem;
  }

  async update(id: number, updateProductCartItemDto: UpdateProductCartItemDto) {
    const productItem = await this.findOne(id);
    productItem.quantity = updateProductCartItemDto.quantity;
    return this.pciRepo.save(productItem);
  }

  async remove(id: number) {
    const productItem = await this.findOne(id);
    return this.pciRepo.remove(productItem);
  }
}
