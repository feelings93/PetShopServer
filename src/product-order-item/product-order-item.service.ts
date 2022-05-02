import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductOrderItemDto } from './dto/create-product-order-item.dto';
import { UpdateProductOrderItemDto } from './dto/update-product-order-item.dto';
import { ProductOrderItem } from './entities/product-order-item.entity';

@Injectable()
export class ProductOrderItemService {
  constructor(
    @InjectRepository(ProductOrderItem)
    private readonly poiRepo: Repository<ProductOrderItem>,
  ) {}
  create(createProductOrderItemDto: CreateProductOrderItemDto) {
    return 'This action adds a new productOrderItem';
  }

  findAll() {
    return `This action returns all productOrderItem`;
  }

  async findOne(id: number) {
    const productItem = await this.poiRepo.findOne(id);
    if (!productItem) throw new NotFoundException('Product item not found');
    return productItem;
  }

  async update(
    id: number,
    updateProductOrderItemDto: UpdateProductOrderItemDto,
  ) {
    const productItem = await this.findOne(id);
    productItem.quantity = updateProductOrderItemDto.quantity;
    return this.poiRepo.save(productItem);
  }

  async remove(id: number) {
    const productItem = await this.findOne(id);
    return this.poiRepo.remove(productItem);
  }
}
