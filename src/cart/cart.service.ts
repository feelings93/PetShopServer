import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {}
  create(createCartDto: CreateCartDto) {
    const cart = this.cartRepo.create(createCartDto);
    return this.cartRepo.save(cart);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return this.cartRepo.findOne(id);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
