import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), PhotosModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
