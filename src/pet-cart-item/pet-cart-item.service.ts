import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetCartItemDto } from './dto/create-pet-cart-item.dto';
import { UpdatePetCartItemDto } from './dto/update-pet-cart-item.dto';
import { PetCartItem } from './entities/pet-cart-item.entity';

@Injectable()
export class PetCartItemService {
  constructor(
    @InjectRepository(PetCartItem)
    private readonly pciRepo: Repository<PetCartItem>,
  ) {}
  create(createPetCartItemDto: CreatePetCartItemDto) {
    return 'This action adds a new petCartItem';
  }

  findAll() {
    return `This action returns all petCartItem`;
  }

  async findOne(id: number) {
    const petItem = await this.pciRepo.findOne(id);
    if (!petItem) throw new NotFoundException('Pet cart item not found!');
    return petItem;
  }

  update(id: number, updatePetCartItemDto: UpdatePetCartItemDto) {
    return `This action updates a #${id} petCartItem`;
  }

  async remove(id: number) {
    const petItem = await this.pciRepo.findOne(id);
    return this.pciRepo.remove(petItem);
  }
}
