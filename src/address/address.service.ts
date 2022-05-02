import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const address = await this.addressRepo.create(createAddressDto);
    return this.addressRepo.save(address);
  }

  findAll() {
    return this.addressRepo.find();
  }

  async findOne(id: number) {
    const address = await this.addressRepo.findOne(id);
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    let address = await this.findOne(id);
    address = { ...address, ...updateAddressDto };
    return this.addressRepo.save(address);
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
