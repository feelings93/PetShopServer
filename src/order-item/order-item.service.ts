import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private productService: ProductsService,
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto) {
    const product = await this.productService.findOne(
      createOrderItemDto.productId,
    );
    const orderItem = await this.orderItemRepo.create(createOrderItemDto);
    orderItem.price = product.price;
    orderItem.quantity = createOrderItemDto.quantity;
    orderItem.product = product;
    product.quantity -= createOrderItemDto.quantity;
    await this.productService.update(product.id, {
      quantity: product.quantity,
    });
    return this.orderItemRepo.save(orderItem);
  }

  async createArray(createOrderItemsDto: CreateOrderItemDto[]) {
    const orderItems = [];
    for (let i = 0; i < createOrderItemsDto.length; i++) {
      const createOrderItemDto = createOrderItemsDto[i];
      const product = await this.productService.findOne(
        createOrderItemDto.productId,
      );
      const orderItem = await this.orderItemRepo.create(createOrderItemDto);
      orderItem.price = product.price;
      orderItem.quantity = createOrderItemDto.quantity;
      orderItem.product = product;
      if (product.quantity < createOrderItemDto.quantity)
        throw new BadRequestException('Vuot qua so luong san pham co san');
      product.quantity -= createOrderItemDto.quantity;
      await this.productService.update(product.id, {
        quantity: product.quantity,
      });
      orderItems.push(orderItem);
    }
    for (let i = 0; i < orderItems.length; i++) {
      orderItems[i] = await this.orderItemRepo.save(orderItems[i]);
    }
    return orderItems;
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
