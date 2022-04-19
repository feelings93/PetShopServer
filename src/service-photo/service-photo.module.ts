import { Module } from '@nestjs/common';
import { ServicePhotoService } from './service-photo.service';
import { ServicePhotoController } from './service-photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePhoto } from './entities/service-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicePhoto])],
  controllers: [ServicePhotoController],
  providers: [ServicePhotoService],
})
export class ServicePhotoModule {}
