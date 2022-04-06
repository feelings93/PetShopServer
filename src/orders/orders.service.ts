import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemService } from 'src/order-item/order-item.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private orderItemService: OrderItemService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepo.create(createOrderDto);
    order.dateOrder = new Date();
    order.orderItems = await this.orderItemService.createArray(
      createOrderDto.products,
    );
    order.total = 0;
    for (let i = 0; i < order.orderItems.length; i++) {
      order.total += order.orderItems[i].price * order.orderItems[i].quantity;
    }

    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

  findOne(id: number) {
    return this.orderRepo.findOne(id, {
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          orderItems: 'order.orderItems',
          product: 'orderItems.product',
        },
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    let order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException();
    }
    order = { ...order, ...updateOrderDto };
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
