import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetTypeService } from 'src/pet-type/pet-type.service';
import { Repository } from 'typeorm';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed) private readonly breedRepo: Repository<Breed>,
    private readonly petTypeService: PetTypeService,
  ) {}
  async create(createBreedDto: CreateBreedDto) {
    const type = await this.petTypeService.findOne(createBreedDto.typeId);
    const breed = await this.breedRepo.create(createBreedDto);
    breed.type = type;
    return this.breedRepo.save(breed);
  }

  findAll() {
    return this.breedRepo.find({ relations: ['pets', 'type'] });
  }

  async findOne(id: number) {
    const breed = await this.breedRepo.findOne(id, {
      relations: ['pets', 'type'],
    });
    if (!breed) throw new NotFoundException('Breed not found!');
    return breed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    const breed = await this.findOne(id);
    if (updateBreedDto?.name) breed.name = updateBreedDto.name;
    return this.breedRepo.save(breed);
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
