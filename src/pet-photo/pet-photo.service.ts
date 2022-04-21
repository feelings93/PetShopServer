import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetPhotoDto } from './dto/create-pet-photo.dto';
import { UpdatePetPhotoDto } from './dto/update-pet-photo.dto';
import { PetPhoto } from './entities/pet-photo.entity';

@Injectable()
export class PetPhotoService {
  constructor(
    @InjectRepository(PetPhoto)
    private readonly petPhotoRepo: Repository<PetPhoto>,
  ) {}
  create(createPetPhotoDto: CreatePetPhotoDto) {
    return 'This action adds a new petPhoto';
  }

  findAll() {
    return `This action returns all petPhoto`;
  }

  async findOne(id: number) {
    const photo = await this.petPhotoRepo.findOne(id);
    if (!photo) throw new NotFoundException('Pet Photo not found');
    return photo;
  }

  update(id: number, updatePetPhotoDto: UpdatePetPhotoDto) {
    return `This action updates a #${id} petPhoto`;
  }

  async remove(id: number) {
    const photo = await this.findOne(id);
    return this.petPhotoRepo.remove(photo);
  }
}
