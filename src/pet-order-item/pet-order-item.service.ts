import { Injectable } from '@nestjs/common';
import { CreatePetOrderItemDto } from './dto/create-pet-order-item.dto';
import { UpdatePetOrderItemDto } from './dto/update-pet-order-item.dto';

@Injectable()
export class PetOrderItemService {
  create(createPetOrderItemDto: CreatePetOrderItemDto) {
    return 'This action adds a new petOrderItem';
  }

  findAll() {
    return `This action returns all petOrderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petOrderItem`;
  }

  update(id: number, updatePetOrderItemDto: UpdatePetOrderItemDto) {
    return `This action updates a #${id} petOrderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} petOrderItem`;
  }
}
