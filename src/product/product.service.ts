import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CategoryService } from 'src/category/category.service';
import { CreateProductPhotoDto } from 'src/product-photo/dto/create-product-photo.dto';
import { ProductPhotoService } from 'src/product-photo/product-photo.service';
import { SubCategoryService } from 'src/sub-category/sub-category.service';
import { storage } from 'src/utils/firebase-storage.utils';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoryService,
    private readonly productPhotoService: ProductPhotoService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ) {
    // Validate
    if (isNaN(+createProductDto.price))
      throw new BadRequestException('price must be number!');
    if (isNaN(+createProductDto.quantity))
      throw new BadRequestException('quantity must be number!');
    if (isNaN(+createProductDto.categoryId))
      throw new BadRequestException('categoryId must be number!');
    if (isNaN(+createProductDto.subCategoryId))
      throw new BadRequestException('subCategoryId must be number!');
    const product = await this.productRepo.create(createProductDto);

    // Set status
    if (createProductDto.quantity > 0) product.status = 'Còn hàng';
    else product.status = 'Hết hàng';
    // Add relation
    product.category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    product.subCategory = await this.subCategoryService.findOne(
      createProductDto.subCategoryId,
    );

    // Upload images to firebase storage
    const photos = [];
    for (let i = 0; i < files.length; i++) {
      const createProductPhotoDto = new CreateProductPhotoDto();
      try {
        const storageRef = ref(
          storage,
          `images/products/${product.id}/` + files[i].originalname,
        );
        const snapshot = await uploadBytes(storageRef, files[i].buffer);
        createProductPhotoDto.url = await getDownloadURL(snapshot.ref);
        photos.push(createProductPhotoDto);
      } catch (error) {
        console.log(error);
        throw new BadRequestException();
      }
    }
    product.photos = photos;
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({
      relations: ['category', 'subCategory', 'photos'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['category', 'subCategory', 'photos'],
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Array<Express.Multer.File> = [],
  ) {
    // Validate
    if (updateProductDto.price && isNaN(+updateProductDto.price))
      throw new BadRequestException('price must be number!');
    if (updateProductDto.quantity && isNaN(+updateProductDto.quantity))
      throw new BadRequestException('quantity must be number!');
    if (updateProductDto.categoryId && isNaN(+updateProductDto.categoryId))
      throw new BadRequestException('categoryId must be number!');
    if (
      updateProductDto.subCategoryId &&
      isNaN(+updateProductDto.subCategoryId)
    )
      throw new BadRequestException('subCategoryId must be number!');
    if (updateProductDto.photoUrls) {
      updateProductDto.photoUrls = JSON.parse(
        '[' + updateProductDto.photoUrls + ']',
      );
    } else updateProductDto.photoUrls = [];

    console.log(updateProductDto.photoUrls);
    if (!Array.isArray(updateProductDto.photoUrls))
      throw new BadRequestException('photoUrls must be array');

    let product = await this.findOne(id);
    product = { ...product, ...updateProductDto };
    // Set status
    if (product.quantity > 0) product.status = 'Còn hàng';
    else product.status = 'Hết hàng';
    // Add relation
    product.category = await this.categoryService.findOne(
      updateProductDto.categoryId,
    );
    product.subCategory = await this.subCategoryService.findOne(
      updateProductDto.subCategoryId,
    );

    const initIdPhotos = product.photos.map((x) => x.id);
    let photos = [];

    if (files || product.photos.length > updateProductDto.photoUrls.length) {
      for (let i = 0; i < initIdPhotos.length; i++) {
        await this.productPhotoService.remove(initIdPhotos[i]);
      }
      let j = 0;
      for (let i = 0; i < updateProductDto.photoUrls.length; i++) {
        const createProductPhotoDto = new CreateProductPhotoDto();
        if (updateProductDto.photoUrls[i].includes('blob:http://')) {
          try {
            const storageRef = ref(
              storage,
              `images/products/${product.id}/` + files[j].originalname,
            );
            const snapshot = await uploadBytes(storageRef, files[j].buffer);
            createProductPhotoDto.url = await getDownloadURL(snapshot.ref);
            photos.push(createProductPhotoDto);
            j++;
          } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
          }
        } else {
          const createProductPhotoDto = new CreateProductPhotoDto();
          createProductPhotoDto.url = updateProductDto.photoUrls[i];
          photos.push(createProductPhotoDto);
        }
      }
    } else {
      photos = product.photos;
    }
    product.photos = photos;
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
