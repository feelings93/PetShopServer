import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const saltRounds = 10;
    if (createCustomerDto.password)
      createCustomerDto.password = bcrypt.hashSync(
        createCustomerDto.password,
        saltRounds,
      );
    const newCustomer = await this.customerRepo.create(createCustomerDto);
    newCustomer.cart = new Cart();
    return this.customerRepo.save(newCustomer);
  }

  findAll() {
    return this.customerRepo.find({
      relations: ['defaultAddress', 'addresses'],
    });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id, {
      relations: ['defaultAddress', 'addresses', 'cart', 'orders'],
    });
    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng này!');
    }
    return customer;
  }

  async findOneByEmail(email: string) {
    const customer = await this.customerRepo.findOne({ email: email });
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const saltRounds = 10;
    const customer = await this.findOne(id);
    customer.name = updateCustomerDto?.name || customer.name;
    customer.phone = updateCustomerDto?.phone || customer.phone;
    customer.password = updateCustomerDto?.password
      ? bcrypt.hashSync(updateCustomerDto.password, saltRounds)
      : customer.password;
    if (typeof updateCustomerDto?.actived === 'boolean')
      customer.actived = updateCustomerDto?.actived;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.customerRepo.save(customer);
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
