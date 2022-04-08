import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from 'src/photos/dto/create-photo.dto';
import { PhotosService } from 'src/photos/photos.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
const firebaseConfig = {
  apiKey: 'AIzaSyCw47amc5lpIeGeAH1r5LIPs-XK8mBxCuU',
  authDomain: 'doan1-343302.firebaseapp.com',
  projectId: 'doan1-343302',
  storageBucket: 'doan1-343302.appspot.com',
  messagingSenderId: '268766015201',
  appId: '1:268766015201:web:dc52ee966d2c9c76ce51a0',
  measurementId: 'G-7JJDE7Q10M',
};
const firebaseapp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseapp);
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private photoService: PhotosService,
    private cateService: CategoriesService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ) {
    console.log(createProductDto);
    createProductDto.quantity = +createProductDto.quantity;
    createProductDto.price = +createProductDto.price;
    createProductDto.categories = createProductDto.selectedCategories.map((x) =>
      JSON.parse(x),
    );
    const product = await this.productRepo.create(createProductDto);
    const photos = [];
    for (let i = 0; i < files.length; i++) {
      const createPhotoDto = new CreatePhotoDto();
      try {
        const storageRef = ref(
          storage,
          `images/products/${product.id}` + files[i].originalname,
        );
        const snapshot = await uploadBytes(storageRef, files[i].buffer);
        createPhotoDto.url = await getDownloadURL(snapshot.ref);
        const photo = await this.photoService.create(createPhotoDto);
        photos.push(photo);
      } catch (error) {
        console.log(error);
        throw new BadRequestException();
      }
    }
    product.photos = photos;
    const categories: Category[] = [];
    for (let i = 0; i < createProductDto.categories.length; i++) {
      const category = await this.cateService.findOne(
        createProductDto.categories[i].id,
      );
      categories.push(category);

      if (
        category.parent &&
        categories.findIndex((x) => x.id === category.parent.id) === -1
      ) {
        const parentCategory = await this.cateService.findOne(
          category.parent.id,
        );
        categories.push(parentCategory);
      }
    }
    product.categories = categories;
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({ relations: ['photos', 'categories'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne(
      { id: id },
      { relations: ['photos', 'categories'] },
    );
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Array<Express.Multer.File> = null,
  ) {
    if (updateProductDto.photoUrls)
      updateProductDto.photoUrls = updateProductDto.photoUrls.map((x) =>
        JSON.parse(x),
      );
    else updateProductDto.photoUrls = [];
    console.log(files, updateProductDto.photoUrls);
    if (updateProductDto.selectedCategories)
      updateProductDto.categories = updateProductDto.selectedCategories.map(
        (x) => JSON.parse(x),
      );
    else updateProductDto.categories = [];
    let product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    product = { ...product, ...updateProductDto };
    const initIdPhotos = product.photos.map((x) => x.id);
    let photos = [];

    if (files || product.photos.length > updateProductDto.photoUrls.length) {
      for (let i = 0; i < initIdPhotos.length; i++) {
        await this.photoService.remove(initIdPhotos[i]);
      }
      let j = 0;
      console.log('cc');
      for (let i = 0; i < updateProductDto.photoUrls.length; i++) {
        const createPhotoDto = new CreatePhotoDto();
        if (updateProductDto.photoUrls[i].includes('blob:http://')) {
          try {
            const storageRef = ref(
              storage,
              `images/products/${product.id}/` + files[j].originalname,
            );
            const snapshot = await uploadBytes(storageRef, files[j].buffer);
            createPhotoDto.url = await getDownloadURL(snapshot.ref);
            const photo = await this.photoService.create(createPhotoDto);
            photos.push(photo);
            j++;
          } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
          }
        } else {
          const createPhotoDto = new CreatePhotoDto();
          createPhotoDto.url = updateProductDto.photoUrls[i];
          const photo = await this.photoService.create(createPhotoDto);
          photos.push(photo);
        }
      }
    } else {
      photos = product.photos;
    }
    product.photos = photos;
    const categories: Category[] = [];
    for (let i = 0; i < updateProductDto.categories.length; i++) {
      const category = await this.cateService.findOne(
        updateProductDto.categories[i].id,
      );
      categories.push(category);

      if (
        category.parent &&
        categories.findIndex((x) => x.id === category.parent.id) === -1
      ) {
        const parentCategory = await this.cateService.findOne(
          category.parent.id,
        );
        categories.push(parentCategory);
      }
    }
    product.categories = categories;
    if (product.quantity === 0) {
      product.status = 'Hết hàng';
    } else if (product.quantity > 0) {
      product.status = 'Còn hàng';
    } else {
      throw new BadRequestException('Số lượng sản phẩm phải lớn hơn 0');
    }
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
