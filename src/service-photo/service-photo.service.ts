import { Injectable } from '@nestjs/common';
import { CreateServicePhotoDto } from './dto/create-service-photo.dto';
import { UpdateServicePhotoDto } from './dto/update-service-photo.dto';

@Injectable()
export class ServicePhotoService {
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

  remove(id: number) {
    return `This action removes a #${id} servicePhoto`;
  }
}
