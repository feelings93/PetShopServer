import { Injectable } from '@nestjs/common';
import { CreateProductPhotoDto } from './dto/create-product-photo.dto';
import { UpdateProductPhotoDto } from './dto/update-product-photo.dto';

@Injectable()
export class ProductPhotoService {
  create(createProductPhotoDto: CreateProductPhotoDto) {
    return 'This action adds a new productPhoto';
  }

  findAll() {
    return `This action returns all productPhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productPhoto`;
  }

  update(id: number, updateProductPhotoDto: UpdateProductPhotoDto) {
    return `This action updates a #${id} productPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} productPhoto`;
  }
}
