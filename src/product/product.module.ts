import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';
import { ProductPhotoModule } from 'src/product-photo/product-photo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    SubCategoryModule,
    ProductPhotoModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
