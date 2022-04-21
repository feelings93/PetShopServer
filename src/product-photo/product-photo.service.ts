import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateProductPhotoDto } from './dto/create-product-photo.dto';
import { UpdateProductPhotoDto } from './dto/update-product-photo.dto';
import { ProductPhoto } from './entities/product-photo.entity';

@Injectable()
export class ProductPhotoService {
  constructor(
    @InjectRepository(ProductPhoto)
    private readonly productPhotoRepo: Repository<ProductPhoto>,
  ) {}
  create(createProductPhotoDto: CreateProductPhotoDto) {
    return 'This action adds a new productPhoto';
  }

  findAll() {
    return `This action returns all productPhoto`;
  }

  async findOne(id: number) {
    const photo = await this.productPhotoRepo.findOne(id);
    if (!photo) throw new NotFoundException('product photo not found!');
    return photo;
  }

  update(id: number, updateProductPhotoDto: UpdateProductPhotoDto) {
    return `This action updates a #${id} productPhoto`;
  }

  async remove(id: number) {
    const photo = await this.findOne(id);
    return this.productPhotoRepo.remove(photo);
  }
}
