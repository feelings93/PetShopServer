import { Injectable } from '@nestjs/common';
import { CreateServiceOrderItemDto } from './dto/create-service-order-item.dto';
import { UpdateServiceOrderItemDto } from './dto/update-service-order-item.dto';

@Injectable()
export class ServiceOrderItemService {
  create(createServiceOrderItemDto: CreateServiceOrderItemDto) {
    return 'This action adds a new serviceOrderItem';
  }

  findAll() {
    return `This action returns all serviceOrderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceOrderItem`;
  }

  update(id: number, updateServiceOrderItemDto: UpdateServiceOrderItemDto) {
    return `This action updates a #${id} serviceOrderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceOrderItem`;
  }
}
