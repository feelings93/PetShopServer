import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServicePhotoDto } from './dto/create-service-photo.dto';
import { UpdateServicePhotoDto } from './dto/update-service-photo.dto';
import { ServicePhoto } from './entities/service-photo.entity';

@Injectable()
export class ServicePhotoService {
  constructor(
    @InjectRepository(ServicePhoto)
    private readonly servicePhotoRepo: Repository<ServicePhoto>,
  ) {}
  create(createServicePhotoDto: CreateServicePhotoDto) {
    return 'This action adds a new servicePhoto';
  }

  findAll() {
    return `This action returns all servicePhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicePhoto`;
  }

  update(id: number, updateServicePhotoDto: UpdateServicePhotoDto) {
    return `This action updates a #${id} servicePhoto`;
  }

  async remove(id: number) {
    const photo = await this.servicePhotoRepo.findOne(id);
    if (!photo) throw new NotFoundException('Photo not found!');
    return this.servicePhotoRepo.remove(photo);
  }
}
