import { Module } from '@nestjs/common';
import { ProductPhotoService } from './product-photo.service';
import { ProductPhotoController } from './product-photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPhoto } from './entities/product-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPhoto])],
  controllers: [ProductPhotoController],
  providers: [ProductPhotoService],
  exports: [ProductPhotoService],
})
export class ProductPhotoModule {}
