import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
  ) {}
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne(id);
    if (!cart) throw new NotFoundException('Cart not found!');
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
