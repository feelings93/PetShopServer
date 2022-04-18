import { Injectable } from '@nestjs/common';
import { CreatePetPhotoDto } from './dto/create-pet-photo.dto';
import { UpdatePetPhotoDto } from './dto/update-pet-photo.dto';

@Injectable()
export class PetPhotoService {
  create(createPetPhotoDto: CreatePetPhotoDto) {
    return 'This action adds a new petPhoto';
  }

  findAll() {
    return `This action returns all petPhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petPhoto`;
  }

  update(id: number, updatePetPhotoDto: UpdatePetPhotoDto) {
    return `This action updates a #${id} petPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} petPhoto`;
  }
}
