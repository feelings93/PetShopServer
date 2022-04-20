import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetTypeDto } from './dto/create-pet-type.dto';
import { UpdatePetTypeDto } from './dto/update-pet-type.dto';
import { PetType } from './entities/pet-type.entity';

@Injectable()
export class PetTypeService {
  constructor(
    @InjectRepository(PetType)
    private readonly petTypeRepo: Repository<PetType>,
  ) {}
  async create(createPetTypeDto: CreatePetTypeDto) {
    const petType = await this.petTypeRepo.create(createPetTypeDto);
    await this.petTypeRepo.save(petType);
    return this.findOne(petType.id);
  }

  findAll() {
    return this.petTypeRepo.find({
      relations: ['pets', 'breeds'],
    });
  }

  async findOne(id: number) {
    const petType = await this.petTypeRepo.findOne(id, {
      relations: ['pets', 'breeds'],
    });
    if (!petType) throw new NotFoundException('Pet type not found!');
    return petType;
  }

  async update(id: number, updatePetTypeDto: UpdatePetTypeDto) {
    let petType = await this.findOne(id);
    petType = { ...petType, ...updatePetTypeDto };
    return this.petTypeRepo.save(petType);
  }

  remove(id: number) {
    return `This action removes a #${id} petType`;
  }
}
