import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetOrderItemDto } from './dto/create-pet-order-item.dto';
import { UpdatePetOrderItemDto } from './dto/update-pet-order-item.dto';
import { PetOrderItem } from './entities/pet-order-item.entity';

@Injectable()
export class PetOrderItemService {
  constructor(
    @InjectRepository(PetOrderItem)
    private readonly poiRepo: Repository<PetOrderItem>,
  ) {}
  create(createPetOrderItemDto: CreatePetOrderItemDto) {
    return 'This action adds a new petOrderItem';
  }

  findAll() {
    return `This action returns all petOrderItem`;
  }

  async findOne(id: number) {
    const petItem = await this.poiRepo.findOne(id);
    if (!petItem) throw new NotFoundException('Pet order item not found!');
    return petItem;
  }

  update(id: number, updatePetOrderItemDto: UpdatePetOrderItemDto) {
    return `This action updates a #${id} petOrderItem`;
  }

  async remove(id: number) {
    const petItem = await this.poiRepo.findOne(id);
    return this.poiRepo.remove(petItem);
  }
}
