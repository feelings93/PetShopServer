import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(@InjectRepository(Photo) private photoRepo: Repository<Photo>) {}
  async create(createPhotoDto: CreatePhotoDto) {
    const photo = await this.photoRepo.create(createPhotoDto);
    return this.photoRepo.save(photo);
  }

  findAll() {
    return `This action returns all photos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  async remove(id: number) {
    const photo = await this.photoRepo.findOne(id);
    if (!photo) {
      throw new NotFoundException('Khong tim thay anh');
    }
    return this.photoRepo.remove(photo);
  }
}
