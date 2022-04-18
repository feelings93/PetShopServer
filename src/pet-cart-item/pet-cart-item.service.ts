import { Injectable } from '@nestjs/common';
import { CreatePetCartItemDto } from './dto/create-pet-cart-item.dto';
import { UpdatePetCartItemDto } from './dto/update-pet-cart-item.dto';

@Injectable()
export class PetCartItemService {
  create(createPetCartItemDto: CreatePetCartItemDto) {
    return 'This action adds a new petCartItem';
  }

  findAll() {
    return `This action returns all petCartItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petCartItem`;
  }

  update(id: number, updatePetCartItemDto: UpdatePetCartItemDto) {
    return `This action updates a #${id} petCartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} petCartItem`;
  }
}
