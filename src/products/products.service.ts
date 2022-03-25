import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from 'src/photos/dto/create-photo.dto';
import { Photo } from 'src/photos/entities/photo.entity';
import { PhotosService } from 'src/photos/photos.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private photoService: PhotosService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto);
    const photos = [];
    for (let i = 0; i < createProductDto.photoUrls.length; i++) {
      const createPhotoDto = new CreatePhotoDto();
      createPhotoDto.url = createProductDto.photoUrls[i];
      const photo = await this.photoService.create(createPhotoDto);
      photos.push(photo);
    }
    product.photos = photos;

    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({ relations: ['photos'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({ id: id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    product = { ...product, ...updateProductDto };
    // const photos = [];
    // for (let i = 0; i < updateProductDto.photoUrls.length; i++) {
    //   const createPhotoDto = new CreatePhotoDto();
    //   createPhotoDto.url = updateProductDto.photoUrls[i];
    //   const photo = await this.photoService.update(createPhotoDto);
    //   photos.push(photo);
    // }
    // product.photos = photos;
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }
}
