import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
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
      relations: ['defaultAddress', 'addresses', 'cart'],
    });
    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng này!');
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let customer = await this.findOne(id);
    customer = { ...customer, ...updateCustomerDto };
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
