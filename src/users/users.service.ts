import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private cartService: CartService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepo.create(createUserDto);
    const cart = await this.cartService.create(new Cart());
    user.cart = cart;
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: number, withCart = false) {
    return this.usersRepo.findOne(id, { relations: withCart ? ['cart'] : [] });
  }
  findByEmail(email: string) {
    return this.usersRepo.findOne({ email: email });
  }
  getCart(id: number) {
    return this.cartService.findOne(id);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    user = { ...user, ...updateUserDto };
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.usersRepo.remove(user);
  }
}
